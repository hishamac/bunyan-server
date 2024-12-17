import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { FamilyService } from './family.service';
import { Family } from './entities/family.entity';
import { CreateFamilyInput } from './dto/create-family.input';
import { UpdateFamilyInput } from './dto/update-family.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';

@Resolver(() => Family)
@UseGuards(RolesGuard)
export class FamilyResolver {
  constructor(private readonly familyService: FamilyService) {}

  @Mutation(() => Family)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createFamily(
    @Args('createFamilyInput') createFamilyInput: CreateFamilyInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      { field: 'name', required: true, type: 'string' },
      { field: 'block', required: true, type: 'string' },
      { field: 'houseNumber', required: true, type: 'string' },
      { field: 'houseHolder', required: true, type: 'string' },
      { field: 'houseName', required: true, type: 'string' },
      // {
      //   field: 'mahalluId',
      //   required: true,
      //   type: 'number',
      //   reference: { model: 'mahallu', field: 'id' },
      // },
      { field: 'place', required: true, type: 'string' },
      { field: 'mobile', required: true, type: 'string' },
      { field: 'whatsapp', required: true, type: 'string' },
      {
        field: 'houseType',
        required: true,
        type: 'string',
        enum: ['OWN', 'RENT'],
      },
      {
        field: 'rationCardType',
        required: true,
        type: 'string',
        enum: ['APL', 'BPL'],
      },
      { field: 'panchayathMunicipality', required: true, type: 'string' },
      { field: 'panchayathWardNo', required: true, type: 'string' },
      { field: 'wardHouseNo', required: true, type: 'string' },
    ];
    return this.familyService.create(
      createFamilyInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => [Family])
  @Roles(RoleEnum.MAHALLU_ADMIN , RoleEnum.DISTRICT_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.SUPER_ADMIN)
  createManyFamilys(
    @Args('createManyFamilyInput', { type: () => [CreateFamilyInput] })
    createManyFamilyInput: CreateFamilyInput[],
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      { field: 'name', required: true, type: 'string' },
      { field: 'block', required: true, type: 'string' },
      { field: 'houseNumber', required: true, type: 'string' },
      { field: 'houseHolder', required: true, type: 'string' },
      { field: 'houseName', required: true, type: 'string' },
      // {
      //   field: 'mahalluId',
      //   required: true,
      //   type: 'number',
      //   reference: { model: 'mahallu', field: 'id' },
      // },
      { field: 'place', required: true, type: 'string' },
      { field: 'mobile', required: true, type: 'string' },
      { field: 'whatsapp', required: true, type: 'string' },
      {
        field: 'houseType',
        required: true,
        type: 'string',
        enum: ['OWN', 'RENT'],
      },
      {
        field: 'rationCardType',
        required: true,
        type: 'string',
        enum: ['APL', 'BPL'],
      },
      { field: 'panchayathMunicipality', required: true, type: 'string' },
      { field: 'panchayathWardNo', required: true, type: 'string' },
      { field: 'wardHouseNo', required: true, type: 'string' },
    ];
    return this.familyService.createMany(
      createManyFamilyInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => Int)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  countFamily(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.familyService.count(filters, relationsToFilter, req.user);
  }

  @Query(() => [Family], { name: 'families' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
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
      'mahallu',
      'mahallu.zone',
      'mahallu.zone.district',
      'members',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.familyService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Family, { name: 'family' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'mahallu',
      'mahallu.zone',
      'mahallu.zone.district',
      'members',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.familyService.findOne(id, 'id', relations);
  }

  @Mutation(() => Family)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateFamily(
    @Args('updateFamilyInput') updateFamilyInput: UpdateFamilyInput,
    @Context('req') req: any,
  ) {
    return this.familyService.update(
      updateFamilyInput.id,
      updateFamilyInput,
      [
        { field: 'name', type: 'string' },
        { field: 'block', type: 'string' },
        { field: 'houseNumber', type: 'string' },
        { field: 'houseHolder', type: 'string' },
        { field: 'houseName', type: 'string' },
        {
          field: 'mahalluId',
          type: 'number',
          reference: { model: 'mahallu', field: 'id' },
        },
        { field: 'place', type: 'string' },
        { field: 'mobile', type: 'string' },
        { field: 'whatsapp', type: 'string' },
        {
          field: 'houseType',
          type: 'string',
          enum: ['OWN', 'RENT'],
        },
        {
          field: 'rationCardType',
          type: 'string',
          enum: ['APL', 'BPL'],
        },
        { field: 'panchayathMunicipality', type: 'string' },
        { field: 'panchayathWardNo', type: 'string' },
        { field: 'wardHouseNo', type: 'string' },
      ],
      req.user,
    );
  }

  @Mutation(() => Family)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeFamily(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.familyService.remove(id, req.user);
  }

  @Mutation(() => Family)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  verifyFamily(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'verified';
    const validationRule: ValidationRule = {
      field: 'verified',
      required: true,
      type: 'boolean',
    };

    return this.familyService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Family])
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeFamilies(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.familyService.removeMany(ids, req.user);
  }
}
