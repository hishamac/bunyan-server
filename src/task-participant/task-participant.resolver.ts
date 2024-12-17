import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { TaskParticipantService } from './task-participant.service';
import { TaskParticipant } from './entities/task-participant.entity';
import { CreateTaskParticipantInput } from './dto/create-task-participant.input';
import { UpdateTaskParticipantInput } from './dto/update-task-participant.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => TaskParticipant)
@UseGuards(RolesGuard)
export class TaskParticipantResolver {
  constructor(
    private readonly taskParticipantService: TaskParticipantService,
  ) {}

  @Mutation(() => TaskParticipant)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createTaskParticipant(
    @Args('createTaskParticipantInput')
    createTaskParticipantInput: CreateTaskParticipantInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'taskId',
        required: true,
        type: 'number',
        reference: {
          model: 'task',
          field: 'id',
        },
      },
      {
        field: 'files',
        required: true,
        type: 'array',
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
        field: 'title',
        required: true,
        type: 'string',
      },
      {
        field: 'description',
        required: true,
        type: 'string',
      },
    ]; // Empty validation rules
    return this.taskParticipantService.create(
      createTaskParticipantInput,
      validationRules,
      req.user,
    );
  }

  // create many
    
      @Mutation(() => [TaskParticipant])
      @Roles(RoleEnum.DISTRICT_ADMIN)
      createManyTaskParticipants(
        @Args('createManyTaskParticipantInput', { type: () => [CreateTaskParticipantInput] })
        createManyTaskParticipantInput: CreateTaskParticipantInput[],
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
        return this.taskParticipantService.createMany(createManyTaskParticipantInput, validationRules, req.user);
      }

  @Query(() => Int)
  @Roles(
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.SUPER_ADMIN,
    RoleEnum.USER,
  )
  countTaskParticipant(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.count(
      filters,
      relationsToFilter,
      req.user,
    );
  }

  @Query(() => [TaskParticipant], { name: 'taskParticipants' })
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
      'task',
      'task.year',
      'mahallu',
      'task.category',
      'task.participants',
      'task.badge',
      'task.campaign',
      'task.campaign.year',
    ]; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.taskParticipantService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => TaskParticipant, { name: 'taskParticipant' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'task',
      'task.year',
      'mahallu',
      'task.category',
      'task.participants',
      'task.badge',
      'task.campaign',
      'task.campaign.year',
    ]; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.taskParticipantService.findOne(id, 'id', relations);
  }

  @Mutation(() => TaskParticipant)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.VILLAGE_ADMIN)
  updateTaskParticipant(
    @Args('updateTaskParticipantInput')
    updateTaskParticipantInput: UpdateTaskParticipantInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'taskId',
        type: 'number',
        reference: {
          model: 'task',
          field: 'id',
        },
      },
      {
        field: 'files',
        type: 'array',
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
        field: 'title',
        type: 'string',
      },
      {
        field: 'description',
        type: 'string',
      },
      {
        field: 'remarks',
        type: 'string',
      },
    ]; // Empty validation rules
    return this.taskParticipantService.update(
      updateTaskParticipantInput.id,
      updateTaskParticipantInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => TaskParticipant)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeTaskParticipant(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.remove(id, req.user);
  }

  @Mutation(() => [TaskParticipant])
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeTaskParticipants(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.removeMany(ids, req.user);
  }

  @Query(() => [TaskParticipant], {
    name: 'getFromTaskParticipationOnMyVillage',
  })
  @Roles(RoleEnum.VILLAGE_ADMIN, RoleEnum.MAHALLU_ADMIN)
  getFromMyVillage(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('orderBy', { type: () => GraphQLJSON, nullable: true })
    orderBy: { field: string; direction: 'asc' | 'desc' },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Args('relationsToInclude', { type: () => [String], nullable: true })
    relationsToInclude: string[],
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.getFromMyVillage(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relationsToInclude,
      req.user,
    );
  }

  @Mutation(() => TaskParticipant)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  verifyTaskParticipant(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.verifyTaskParticipant(id, req.user);
  }

  @Mutation(() => TaskParticipant)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  claimTaskParticipant(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.taskParticipantService.claimTaskParticipant(id, req.user);
  }
}
