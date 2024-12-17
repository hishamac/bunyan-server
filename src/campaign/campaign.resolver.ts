import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Campaign)
@UseGuards(RolesGuard)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => Campaign)
  @Roles(RoleEnum.SUPER_ADMIN)
  createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        required: true,
        unique: true,
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
      {
        field: 'yearId',
        required: true,
        type: 'number',
        reference: {
          model: 'year',
          field: 'id',
        },
      },
      {
        field: 'badgeId',
        required: true,
        type: 'number',
        reference: {
          model: 'badge',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.campaignService.create(
      createCampaignInput,
      validationRules,
      req.user,
    );
  }

  @Query(()=> Int)
  countCampaign(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.campaignService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Campaign], { name: 'campaigns' })
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
    const allowedRelations: string[] = ['tasks', 'year', 'tasks.category' , 'badge']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.campaignService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Campaign, { name: 'campaign' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['tasks', 'year', 'tasks.category']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.campaignService.findOne(id, 'id', relations);
  }

  @Mutation(() => Campaign)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateCampaign(
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        unique: true,
        type: 'string',
      },
      {
        field: 'description',
        type: 'string',
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
      {
        field: 'badgeId',
        type: 'number',
        reference: {
          model: 'badge',
          field: 'id',
        },
      },
    ]; // Empty validation rules
    return this.campaignService.update(
      updateCampaignInput.id,
      updateCampaignInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Campaign)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeCampaign(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.campaignService.remove(id, req.user);
  }

  @Mutation(() => [Campaign])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeCampaigns(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.campaignService.removeMany(ids,req.user);
  }
}
