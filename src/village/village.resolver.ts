import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { VillageService } from './village.service';
import { Village } from './entities/village.entity';
import { CreateVillageInput } from './dto/create-village.input';
import { UpdateVillageInput } from './dto/update-village.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';

@Resolver(() => Village)
@UseGuards(RolesGuard)
export class VillageResolver {
  constructor(private readonly villageService: VillageService) {}

  @Mutation(() => Village)
  @Roles(RoleEnum.ZONE_ADMIN)
  createVillage(
    @Args('createVillageInput') createVillageInput: CreateVillageInput,
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
        field: 'zoneId',
        required: true,
        type: 'number',
        reference: {
          model: 'zone',
          field: 'id',
        },
      },
    ];
    return this.villageService.create(
      createVillageInput,
      validationRules,
      req.user,
    );
  }

  // create many

  @Mutation(() => [Village])
  @Roles(RoleEnum.DISTRICT_ADMIN, RoleEnum.SUPER_ADMIN)
  createManyVillages(
    @Args('createManyVillageInput', { type: () => [CreateVillageInput] })
    createManyVillageInput: CreateVillageInput[],
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        required: true,
        type: 'string',
        // unique: true,
      },
      {
        field: 'zoneId',
        required: true,
        type: 'number',
        reference: {
          model: 'zone',
          field: 'id',
        },
      },
    ];
    return this.villageService.createMany(
      createManyVillageInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => [Village], { name: 'villages' })
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
    const allowedRelations: string[] = [
      'zone',
      'zone.district',
      'mahallus',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.villageService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Village, { name: 'village' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'zone',
      'zone.district',
      'mahallus',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.villageService.findOne(id, 'id', relations);
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
  countVillage(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.villageService.count(filters, relationsToFilter, req.user);
  }

  @Mutation(() => Village)
  @Roles(RoleEnum.ZONE_ADMIN)
  updateVillage(
    @Args('updateVillageInput') updateVillageInput: UpdateVillageInput,
    @Context('req') req: any,
  ) {
    return this.villageService.update(
      updateVillageInput.id,
      updateVillageInput,
      [
        {
          field: 'name',
          unique: true,
          type: 'string',
        },
        {
          field: 'zoneId',
          type: 'number',
          reference: {
            model: 'zone',
            field: 'id',
          },
        },
      ],
      req.user,
    );
  }

  @Mutation(() => Village)
  @Roles(RoleEnum.ZONE_ADMIN)
  removeVillage(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.villageService.remove(id, req.user);
  }

  @Mutation(() => [Village])
  @Roles(RoleEnum.ZONE_ADMIN)
  removeVillages(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.villageService.removeMany(ids, req.user);
  }
}
