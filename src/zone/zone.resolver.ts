import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { ZoneService } from './zone.service';
import { Zone } from './entities/zone.entity';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';

@Resolver(() => Zone)
@UseGuards(RolesGuard)
export class ZoneResolver {
  constructor(private readonly zoneService: ZoneService) {}

  @Mutation(() => Zone)
  @Roles(RoleEnum.DISTRICT_ADMIN)
  createZone(
    @Args('createZoneInput') createZoneInput: CreateZoneInput,
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
    return this.zoneService.create(createZoneInput, validationRules, req.user);
  }

  
  // create many

  @Mutation(() => [Zone])
  @Roles(RoleEnum.DISTRICT_ADMIN , RoleEnum.SUPER_ADMIN)
  createManyZones(
    @Args('createManyZoneInput', { type: () => [CreateZoneInput] })
    createManyZoneInput: CreateZoneInput[],
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
    return this.zoneService.createMany(createManyZoneInput, validationRules, req.user);
  }

  @Query(() => Int)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
  countZone(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.zoneService.count(filters, relationsToFilter, req.user);
  }


  @Query(() => [Zone], { name: 'zones' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
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
    const allowedRelations = [
      'district',
      'villages',
      'villages.mahallu',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.zoneService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Zone, { name: 'zone' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations = [
      'district',
      'villages',
      'villages.mahallu',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.zoneService.findOne(id, 'id', relations);
  }

  @Mutation(() => Zone)
  @Roles(RoleEnum.DISTRICT_ADMIN)
  updateZone(
    @Args('updateZoneInput') updateZoneInput: UpdateZoneInput,
    @Context('req') req: any,
  ) {
    return this.zoneService.update(
      updateZoneInput.id,
      updateZoneInput,
      [
        {
          field: 'name',
          unique: true,
          type: 'string',
        },
        {
          field: 'districtId',
          type: 'number',
          reference: {
            model: 'district',
            field: 'id',
          },
        },
      ],
      req.user,
    );
  }

  @Mutation(() => Zone)
  @Roles(RoleEnum.DISTRICT_ADMIN)
  removeZone(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.zoneService.remove(id, req.user);
  }

  @Mutation(() => [Zone])
  @Roles(RoleEnum.DISTRICT_ADMIN)
  removeZones(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.zoneService.removeMany(ids, req.user);
  }
}
