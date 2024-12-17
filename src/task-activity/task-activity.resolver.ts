import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Info,
} from '@nestjs/graphql';
import { TaskActivityService } from './task-activity.service';
import { TaskActivity } from './entities/task-activity.entity';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';

@Resolver(() => TaskActivity)
export class TaskActivityResolver {
  constructor(
    private readonly taskActivityService: TaskActivityService,
  ) {}

  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.INFO_ADMIN,
  )
  @Query(() => [TaskActivity], { name: 'taskActivities' })
  findAll(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('filters', { type: () => GraphQLJSON })
    filters: { [key: string]: any },
    @Args('orderBy', { type: () => GraphQLJSON })
    orderBy: { field: string; direction: 'asc' | 'desc' },
    @Args('relationsToFilter', { type: () => GraphQLJSON })
    relationsToFilter: { [key: string]: any },
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const allowedRelations = ['actor', 'target'];
    const fields = Object.keys(fieldsProjection(info));
    const relations = extractRelations(fields, allowedRelations);

    return this.taskActivityService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }
}
