import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { IncomeService } from './income.service';
import { Income } from './entities/income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Income)
@UseGuards(RolesGuard)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) {}

  @Mutation(() => Income)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createIncome(
    @Args('createIncomeInput') createIncomeInput: CreateIncomeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'date',
        required: true,
        type: 'date',
      },
      {
        field: 'amount',
        required: true,
        type: 'number',
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
      {
        field: 'description',
        required: true,
        type: 'string',
      },
      {
        field: 'categoryId',
        required: true,
        type: 'number',
        reference: {
          model: 'category',
          field: 'id',
        },
      },
      {
        field: 'receivedBy',
        required: true,
        type: 'string',
      },
      {
        field: 'accountId',
        required: true,
        type: 'number',
        reference: {
          model: 'account',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.incomeService.create(
      createIncomeInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [Income])
        @Roles(RoleEnum.DISTRICT_ADMIN)
        createManyIncomes(
          @Args('createManyIncomeInput', { type: () => [CreateIncomeInput] })
          createManyIncomeInput: CreateIncomeInput[],
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
          return this.incomeService.createMany(createManyIncomeInput, validationRules, req.user);
        }

  @Query(()=> Int)
  countIncome(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.incomeService.count(
      filters,
      relationsToFilter,
    );
  }

  @Roles(RoleEnum.MAHALLU_ADMIN)
  @Query(() => [Income], { name: 'incomes' })
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
    const allowedRelations: string[] = ['category', 'mahallu', 'account']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.incomeService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Roles(RoleEnum.MAHALLU_ADMIN)
  @Query(() => Income, { name: 'income' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['category', 'mahallu', 'account']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.incomeService.findOne(id, 'id', relations);
  }

  @Mutation(() => Income)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateIncome(
    @Args('updateIncomeInput') updateIncomeInput: UpdateIncomeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'date',
        type: 'date',
      },
      {
        field: 'amount',
        type: 'number',
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
        field: 'description',
        type: 'string',
      },
      {
        field: 'categoryId',
        type: 'number',
        reference: {
          model: 'category',
          field: 'id',
        },
      },
      {
        field: 'receivedBy',
        type: 'string',
      },
      {
        field: 'accountId',
        type: 'number',
        reference: {
          model: 'account',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.incomeService.update(
      updateIncomeInput.id,
      updateIncomeInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Income)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeIncome(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.incomeService.remove(id, req.user);
  }

  @Mutation(() => [Income])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeIncomes(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.incomeService.removeMany(ids,req.user);
  }
}
