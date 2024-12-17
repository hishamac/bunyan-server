import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Info,
} from '@nestjs/graphql';
import { CredentialService } from './credential.service';
import { Credential } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { ValidationRule } from '../utils/types';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { RoleEnum } from '../enums/role';

@Resolver(() => Credential)
// @UseGuards(RolesGuard)
export class CredentialResolver {
  constructor(private readonly credentialService: CredentialService) {}

  @Mutation(() => Credential)
  @Roles(RoleEnum.SUPER_ADMIN)
  createCredential(
    @Args('createCredentialInput') createCredentialInput: CreateCredentialInput,

  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'username',
        required: true,
        type: 'string',
        unique: true,
      },
      {
        field: 'password',
        required: true,
        type: 'string',
      },
      {
        field: 'role',
        required: true,
        type: 'string',
        enum: [
          'SUPER_ADMIN',
          'ZONE_ADMIN',
          'DISTRICT_ADMIN',
          'MAHALLU_ADMIN',
          'VILLAGE_ADMIN',
          'INFO_ADMIN',
        ],
      },
    ];

    return this.credentialService.create(
      createCredentialInput,
      validationRules,
    );
  }

  @Query(()=> Int)
  countCredential(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.credentialService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Credential], { name: 'credentials' })
  findAll(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('orderBy', { type: () => GraphQLJSON, nullable: true })
    orderBy: { field: string; direction: 'asc' | 'desc' },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Info() info: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations = [];
    const relations = extractRelations(fields, allowedRelations);

    return this.credentialService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  // logout method to clear the cookie
  @Mutation(() => Boolean)
  async logout(@Context() context?: any): Promise<boolean> {
    context.res.clearCookie('token');
    return true;
  }

  @Query(() => Credential, { name: 'credential' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.credentialService.findOne(id);
  }

  @Mutation(() => Credential)
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.DISTRICT_ADMIN , RoleEnum.MAHALLU_ADMIN , RoleEnum.VILLAGE_ADMIN , RoleEnum.INFO_ADMIN)
  updateCredential(
    @Args('updateCredentialInput') updateCredentialInput: UpdateCredentialInput,
  ) {
    return this.credentialService.update(
      updateCredentialInput.id,
      updateCredentialInput,
      [],
    );
  }

  @Mutation(() => Credential)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeCredential(@Args('id', { type: () => Int }) id: number) {
    return this.credentialService.remove(id);
  }

  @Mutation(() => [Credential])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeCredentials(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.credentialService.removeMany(ids,req.user);
  }

  @Mutation(() => Boolean)
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.DISTRICT_ADMIN , RoleEnum.MAHALLU_ADMIN , RoleEnum.VILLAGE_ADMIN , RoleEnum.INFO_ADMIN)
  async changePassword(
    @Args('oldPassword', { type: () => String }) oldPassword: string,
    @Args('newPassword', { type: () => String }) newPassword: string,
    @Context('req') req: any,
  ) {
    return this.credentialService.changePassword(
      req.user.id,
      oldPassword,
      newPassword,
    );
  }

}
