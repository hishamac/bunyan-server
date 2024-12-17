import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { CommitteeService } from './committee.service';
import { Committee } from './entities/committee.entity';
import { CreateCommitteeInput } from './dto/create-committee.input';
import { UpdateCommitteeInput } from './dto/update-committee.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Committee)
@UseGuards(RolesGuard)
export class CommitteeResolver {
  constructor(private readonly committeeService: CommitteeService) {}

  @Mutation(() => Committee)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createCommittee(
    @Args('createCommitteeInput') createCommitteeInput: CreateCommitteeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'memberId',
        required: true,
        type: 'number',
        reference: {
          model: 'member',
          field: 'id',
        },
      },
      {
        field: 'position',
        required: true,
        type: 'string',
      },
      {
        field: 'mahalluId',
        required: true,
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.committeeService.create(
      createCommitteeInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => Int)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  countCommittee(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.committeeService.count(filters, relationsToFilter, req.user);
  }

  @Query(() => [Committee], { name: 'committees' })
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
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
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu', 'member', 'member.family']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.committeeService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Committee, { name: 'committee' })
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu', 'member', 'member.family']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.committeeService.findOne(id, 'id', relations, req.user);
  }

  @Mutation(() => Committee)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateCommittee(
    @Args('updateCommitteeInput') updateCommitteeInput: UpdateCommitteeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'memberId',
        type: 'number',
        reference: {
          model: 'member',
          field: 'id',
        },
      },
      {
        field: 'position',
        type: 'string',
      },
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.committeeService.update(
      updateCommitteeInput.id,
      updateCommitteeInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Committee)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeCommittee(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.committeeService.remove(id, req.user);
  }

  @Mutation(() => [Committee])
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeCommittees(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.committeeService.removeMany(ids, req.user);
  }
}
