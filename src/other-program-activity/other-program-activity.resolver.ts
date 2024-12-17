import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Info,
} from '@nestjs/graphql';
import { OtherProgramActivityService } from './other-program-activity.service';
import { OtherProgramActivity } from './entities/other-program-activity.entity';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';

@Resolver(() => OtherProgramActivity)
export class OtherProgramActivityResolver {
  constructor(
    private readonly otherProgramActivityService: OtherProgramActivityService,
  ) {}

  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.INFO_ADMIN,
  )
  @Query(() => [OtherProgramActivity], { name: 'otherProgramActivities' })
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

    return this.otherProgramActivityService.findAll(
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
