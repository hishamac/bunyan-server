import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Category)
@UseGuards(RolesGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
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
      {
        field: 'type',
        required: true,
        type: 'string',
        enum: ['INCOME', 'EXPENSE'],
      },
    ]; // Empty validation rules
    return this.categoryService.create(
      createCategoryInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => [Category], { name: 'categories' })
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
    const allowedRelations: string[] = ['income', 'expense', 'mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.categoryService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(()=> Int)
  countCategory(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.categoryService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['income', 'expense', 'mahallu'];
    const relations = extractRelations(fields, allowedRelations);
    return this.categoryService.findOne(id, 'id', relations);
  }

  @Mutation(() => Category)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
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
        field: 'type',
        type: 'string',
        enum: ['INCOME', 'EXPENSE'],
      },
    ]; // Empty validation rules
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Category)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeCategory(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.categoryService.remove(id, req.user);
  }

  @Mutation(() => [Category])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeCategories(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.categoryService.removeMany(ids,req.user);
  }
}
