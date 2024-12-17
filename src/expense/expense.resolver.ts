import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Expense)
@UseGuards(RolesGuard)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(() => Expense)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
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
        field: 'paidBy',
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
    return this.expenseService.create(
      createExpenseInput,
      validationRules,
      req.user,
    );
  }

  @Query(()=> Int)
  countExpense(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.expenseService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Expense], { name: 'expenses' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
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

    return this.expenseService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Expense, { name: 'expense' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['category', 'mahallu', 'account']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.expenseService.findOne(id, 'id', relations);
  }

  @Mutation(() => Expense)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'date',
        type: 'date',
      },
      {
        field: 'amount',
        type: 'number',
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
        field: 'paidBy',
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
    return this.expenseService.update(
      updateExpenseInput.id,
      updateExpenseInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Expense)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeExpense(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.expenseService.remove(id, req.user);
  }

  @Mutation(() => [Expense])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeExpenses(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.expenseService.removeMany(ids,req.user);
  }
}
