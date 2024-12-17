import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Task)
@UseGuards(RolesGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  @Roles(RoleEnum.SUPER_ADMIN)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
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
        field: 'categoryId',
        required: true,
        type: 'number',
        reference: {
          model: 'taskCategory',
          field: 'id',
        },
      },
      // {
      //   field: 'badgeId',
      //   type: 'number',
      //   required: false,
      //   reference: {
      //     model: 'badge',
      //     field: 'id',
      //   },
      // },
      {
        field: 'points',
        required: true,
        type: 'number',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      },
      {
        field: 'yearId',
        required: true,
        type: 'number',
        reference: {
          model: 'year',
          field: 'id',
        },
      },
      // {
      //   field: 'campaignId',
      //   type: 'number',
      //   reference: {
      //     model: 'campaign',
      //     field: 'id',
      //   },
      // },
      {
        field: 'startDate',
        required: true,
        type: 'date',
      },
      {
        field: 'dueDate',
        required: true,
        type: 'date',
      },
    ]; // Empty validation rules
    return this.taskService.create(createTaskInput, validationRules, req.user);
  }

  @Mutation(() => [Task])
  @Roles(RoleEnum.DISTRICT_ADMIN)
  createManyTasks(
    @Args('createManyTaskInput', { type: () => [CreateTaskInput] })
    createManyTaskInput: CreateTaskInput[],
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
        field: 'categoryId',
        required: true,
        type: 'number',
        reference: {
          model: 'taskCategory',
          field: 'id',
        },
      },
      // {
      //   field: 'badgeId',
      //   type: 'number',
      //   required: false,
      //   reference: {
      //     model: 'badge',
      //     field: 'id',
      //   },
      // },
      {
        field: 'points',
        required: true,
        type: 'number',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      },
      {
        field: 'yearId',
        required: true,
        type: 'number',
        reference: {
          model: 'year',
          field: 'id',
        },
      },
      // {
      //   field: 'campaignId',
      //   type: 'number',
      //   reference: {
      //     model: 'campaign',
      //     field: 'id',
      //   },
      // },
      {
        field: 'startDate',
        required: true,
        type: 'date',
      },
      {
        field: 'dueDate',
        required: true,
        type: 'date',
      },
    ];
    return this.taskService.createMany(
      createManyTaskInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => Int)
  countTask(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.taskService.count(filters, relationsToFilter);
  }

  @Query(() => [Task], { name: 'tasks' })
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN, RoleEnum.USER)
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
    const allowedRelations: string[] = [
      'category',
      'campaign',
      'campaign.year',
      'year',
      'participants',
      'badge',
    ]; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.taskService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Task, { name: 'task' })
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN, RoleEnum.USER)
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'category',
      'campaign',
      'campaign.year',
      'year',
      'participants',
      'badge',
    ]; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.taskService.findOne(id, 'id', relations, req.user);
  }

  @Mutation(() => Task)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
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
        field: 'categoryId',
        type: 'number',
        reference: {
          model: 'taskCategory',
          field: 'id',
        },
      },
      // {
      //   field: 'badgeId',
      //   type: 'number',
      //   reference: {
      //     model: 'badge',
      //     field: 'id',
      //   },
      // },
      {
        field: 'points',
        type: 'number',
      },
      {
        field: 'active',
        type: 'boolean',
      },
      {
        field: 'yearId',
        type: 'number',
        reference: {
          model: 'year',
          field: 'id',
        },
      },
      // {
      //   field: 'campaignId',
      //   type: 'number',
      //   reference: {
      //     model: 'campaign',
      //     field: 'id',
      //   },
      // },
      {
        field: 'startDate',
        type: 'date',
      },
      {
        field: 'dueDate',
        type: 'date',
      },
    ]; // Empty validation rules
    return this.taskService.update(
      updateTaskInput.id,
      updateTaskInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Task)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeTask(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.taskService.remove(id, req.user);
  }

  @Mutation(() => Task)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  activeOrInactiveTask(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'active';
    const validationRule: ValidationRule = {
      field: 'active',
      required: true,
      type: 'boolean',
    };

    return this.taskService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Task])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeTasks(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.taskService.removeMany(ids, req.user);
  }
}