import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { YearService } from './year.service';
import { Year } from './entities/year.entity';
import { CreateYearInput } from './dto/create-year.input';
import { UpdateYearInput } from './dto/update-year.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Year)
@UseGuards(RolesGuard)
export class YearResolver {
  constructor(private readonly yearService: YearService) {}

  @Mutation(() => Year)
  @Roles(RoleEnum.SUPER_ADMIN)
  createYear(
    @Args('createYearInput') createYearInput: CreateYearInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        required: true,
        type: 'string',
      },
      {
        field: 'type',
        required: true,
        type: 'string',
        enum: ['CURRENT', 'PAST', 'ALL'],
      },
    ]; // Empty validation rules
    return this.yearService.create(createYearInput, validationRules, req.user);
  }

  // create many
  
    @Mutation(() => [Year])
    @Roles(RoleEnum.DISTRICT_ADMIN)
    createManyYears(
      @Args('createManyYearInput', { type: () => [CreateYearInput] })
      createManyYearInput: CreateYearInput[],
      @Context('req') req: any,
    ) {
      const validationRules: ValidationRule[] = [
        {
          field: 'name',
          required: true,
          type: 'string',
          unique: true,
        },
        {
          field: 'districtId',
          required: true,
          type: 'number',
          reference: {
            model: 'district',
            field: 'id',
          },
        },
      ];
      return this.yearService.createMany(createManyYearInput, validationRules, req.user);
    }

  @Query(()=> Int)
  countYear(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.yearService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Year], { name: 'years' })
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
    const allowedRelations: string[] = ['campaigns', 'tasks', 'badges']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.yearService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Year, { name: 'year' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['campaigns', 'tasks', 'badges']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.yearService.findOne(id, 'id', relations);
  }

  @Mutation(() => Year)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateYear(
    @Args('updateYearInput') updateYearInput: UpdateYearInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
      },
      {
        field: 'type',
        type: 'string',
        enum: ['CURRENT', 'PAST', 'ALL'],
      },
    ]; // Empty validation rules
    return this.yearService.update(
      updateYearInput.id,
      updateYearInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Year)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeYear(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.yearService.remove(id, req.user);
  }

  @Mutation(() => [Year])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeYears(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.yearService.removeMany(ids,req.user);
  }
}
