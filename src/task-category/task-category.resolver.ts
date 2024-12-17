import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { TaskCategoryService } from './task-category.service';
import { TaskCategory } from './entities/task-category.entity';
import { CreateTaskCategoryInput } from './dto/create-task-category.input';
import { UpdateTaskCategoryInput } from './dto/update-task-category.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => TaskCategory)
@UseGuards(RolesGuard)
export class TaskCategoryResolver {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Mutation(() => TaskCategory)
  @Roles(RoleEnum.SUPER_ADMIN)
  createTaskCategory(
    @Args('createTaskCategoryInput')
    createTaskCategoryInput: CreateTaskCategoryInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        required: true,
        type: 'string',
      },
      {
        field: 'description',
        required: true,
        type: 'string',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      },
    ]; // Empty validation rules
    return this.taskCategoryService.create(
      createTaskCategoryInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [TaskCategory])
        @Roles(RoleEnum.DISTRICT_ADMIN)
        createManyTaskCategorys(
          @Args('createManyTaskCategoryInput', { type: () => [CreateTaskCategoryInput] })
          createManyTaskCategoryInput: CreateTaskCategoryInput[],
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
          return this.taskCategoryService.createMany(createManyTaskCategoryInput, validationRules, req.user);
        }

  @Query(()=> Int)
  countTaskCategory(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.taskCategoryService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [TaskCategory], { name: 'taskCategories' })
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
    const allowedRelations: string[] = ['tasks', 'otherPrograms']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.taskCategoryService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => TaskCategory, { name: 'taskCategory' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['tasks', 'otherPrograms']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.taskCategoryService.findOne(id, 'id', relations);
  }

  @Mutation(() => TaskCategory)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateTaskCategory(
    @Args('updateTaskCategoryInput')
    updateTaskCategoryInput: UpdateTaskCategoryInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        type: 'string',
      },
      {
        field: 'description',
        type: 'string',
      },
      {
        field: 'active',
        type: 'boolean',
      }
    ]; // Empty validation rules
    return this.taskCategoryService.update(
      updateTaskCategoryInput.id,
      updateTaskCategoryInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => TaskCategory)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeTaskCategory(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.taskCategoryService.remove(id, req.user);
  }

  @Mutation(() => [TaskCategory])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeTaskCategories(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.taskCategoryService.removeMany(ids,req.user);
  }
}
