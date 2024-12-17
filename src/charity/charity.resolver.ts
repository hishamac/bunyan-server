import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { CharityService } from './charity.service';
import { Charity } from './entities/charity.entity';
import { CreateCharityInput } from './dto/create-charity.input';
import { UpdateCharityInput } from './dto/update-charity.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Charity)
@UseGuards(RolesGuard)
export class CharityResolver {
  constructor(private readonly charityService: CharityService) {}

  @Mutation(() => Charity)
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.MAHALLU_ADMIN)
  createCharity(
    @Args('createCharityInput') createCharityInput: CreateCharityInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'posterUrl',
        type: 'string',
        required: true,
      },
      {
        field: 'title',
        type: 'string',
        required: true,
      },
      {
        field: 'description',
        type: 'string',
        required: true,
      },
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'admin',
        type: 'boolean',
        required: true,
      },
      {
        field: 'startingDate',
        type: 'date',
        required: true,
      },
      {
        field: 'active',
        type: 'boolean',
        required: true,
      },
      {
        field: 'status',
        type: 'string',
        required: true,
        enum: ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'],
      },
      {
        field: 'target',
        type: 'number',
        required: true,
      },
      {
        field: 'expirationDate',
        type: 'date',
        required: true,
      },
      {
        field: 'remarks',
        type: 'string',
        required: true,
      },
    ]; // Empty validation rules
    return this.charityService.create(
      createCharityInput,
      validationRules,
      req.user,
    );
  }

  @Query(()=> Int)
  countCharity(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.charityService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Charity], { name: 'charities' })
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
    const allowedRelations: string[] = ['mahallu', 'donations']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.charityService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Charity, { name: 'charity' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu', 'donations']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.charityService.findOne(id, 'id', relations);
  }

  @Mutation(() => Charity)
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.MAHALLU_ADMIN)
  updateCharity(
    @Args('updateCharityInput') updateCharityInput: UpdateCharityInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'posterUrl',
        type: 'string',
      },
      {
        field: 'title',
        type: 'string',
      },
      {
        field: 'description',
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
      {
        field: 'admin',
        type: 'boolean',
      },
      {
        field: 'startingDate',
        type: 'date',
      },
      {
        field: 'active',
        type: 'boolean',
      },
      {
        field: 'status',
        type: 'string',
        enum: ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'],
      },
      {
        field: 'target',
        type: 'number',
      },
      {
        field: 'expirationDate',
        type: 'date',
      },
      {
        field: 'remarks',
        type: 'string',
      },
    ]; // Empty validation rules
    return this.charityService.update(
      updateCharityInput.id,
      updateCharityInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Charity)
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.MAHALLU_ADMIN)
  removeCharity(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.charityService.remove(id, req.user);
  }

  @Mutation(() => Charity)
  @Roles(RoleEnum.MAHALLU_ADMIN)
    activeOrInactiveCharity(
       @Args('value', { type: () => Boolean }) value: boolean,
      @Context('req') req: any,
    ) {
      const fieldName = 'active';
      const validationRule: ValidationRule = 
        {
          field: 'active',
          required: true,
          type: 'boolean',
        }
  
      return this.charityService.updateColumn(fieldName,value,validationRule,req.user);
    }

    @Mutation(() => [Charity])
    @Roles(RoleEnum.SUPER_ADMIN)
    removeCharities(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
      return this.charityService.removeMany(ids,req.user);
    }
}
