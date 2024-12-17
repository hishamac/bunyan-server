import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { BadgeService } from './badge.service';
import { Badge } from './entities/badge.entity';
import { CreateBadgeInput } from './dto/create-badge.input';
import { UpdateBadgeInput } from './dto/update-badge.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Badge)
@UseGuards(RolesGuard)
export class BadgeResolver {
  constructor(private readonly badgeService: BadgeService) {}

  @Mutation(() => Badge)
  @Roles(RoleEnum.SUPER_ADMIN)
  createBadge(
    @Args('createBadgeInput') createBadgeInput: CreateBadgeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
        required: true,
        unique: true,
      },
      {
        field: 'icon',
        type: 'string',
      },
      {
        field: 'yearId',
        type: 'number',
        required: true,
        reference: {
          model: 'year',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.badgeService.create(
      createBadgeInput,
      validationRules,
      req.user,
    );
  }

  @Query(()=> Int)
  countBadge(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.badgeService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Badge], { name: 'badges' })
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
    const allowedRelations: string[] = ['year'];
    const relations = extractRelations(fields, allowedRelations);

    return this.badgeService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Badge, { name: 'badge' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['year'];
    const relations = extractRelations(fields, allowedRelations);
    return this.badgeService.findOne(id, 'id', relations);
  }

  @Mutation(() => Badge)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateBadge(
    @Args('updateBadgeInput') updateBadgeInput: UpdateBadgeInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
        unique: true,
      },
      {
        field: 'icon',
        type: 'string',
      },
      {
        field: 'yearId',
        type: 'number',
        reference: {
          model: 'year',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.badgeService.update(
      updateBadgeInput.id,
      updateBadgeInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Badge)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeBadge(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.badgeService.remove(id, req.user);
  }

  @Mutation(() => [Badge])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeBadges(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.badgeService.removeMany(ids,req.user);
  }
}
