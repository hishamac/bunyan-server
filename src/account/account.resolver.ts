import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Account)
@UseGuards(RolesGuard)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
        required: true,
      },
      {
        field: 'mahalluId',
        type: 'number',
        required: true,
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'balance',
        type: 'number',
        required: true,
      },
    ]; // Empty validation rules
    return this.accountService.create(
      createAccountInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => Int)
  countAccount(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.accountService.count(filters, relationsToFilter);
  }

  @Query(() => [Account], { name: 'accounts' })
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
    const allowedRelations: string[] = [
      'mahallu',
      'income',
      'expense',
      'income.category',
      'expense.category',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.accountService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Account, { name: 'account' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'mahallu',
      'income',
      'expense',
      'income.category',
      'expense.category',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.accountService.findOne(id, 'id', relations);
  }

  @Mutation(() => Account)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
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
        field: 'balance',
        type: 'number',
      },
    ]; // Empty validation rules
    return this.accountService.update(
      updateAccountInput.id,
      updateAccountInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Account)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeAccount(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.accountService.remove(id, req.user);
  }

  @Mutation(() => [Account])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeAccounts(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.accountService.removeMany(ids,req.user);
  }
}
