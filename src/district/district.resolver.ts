import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { DistrictService } from './district.service';
import { District } from './entities/district.entity';
import { CreateDistrictInput } from './dto/create-district.input';
import { UpdateDistrictInput } from './dto/update-district.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';

@Resolver(() => District)
@UseGuards(RolesGuard)
export class DistrictResolver {
  constructor(private readonly districtService: DistrictService) {}

  @Mutation(() => District)
  @Roles(RoleEnum.SUPER_ADMIN)
  createDistrict(
    @Args('createDistrictInput') createDistrictInput: CreateDistrictInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        required: true,
        type: 'string',
        unique: true,
      },
    ];
    return this.districtService.create(
      createDistrictInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [District])
          @Roles(RoleEnum.SUPER_ADMIN)
          createManyDistricts(
            @Args('createManyDistrictInput', { type: () => [CreateDistrictInput] })
            createManyDistrictInput: CreateDistrictInput[],
            @Context('req') req: any,
          ) {
            const validationRules: ValidationRule[] = [
              {
                field: 'name',
                required: true,
                type: 'string',
                unique: true,
              },
            ];
            return this.districtService.createMany(createManyDistrictInput, validationRules, req.user);
          }

  @Query(() => [District], { name: 'districts' })
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
    const allowedRelations = [
      'zones',
      'zones.villages',
      'zones.villages.mahallus',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.districtService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => District, { name: 'district' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations = [
      'zones',
      'zones.villages',
      'zones.villages.mahallus',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.districtService.findOne(id, 'id', relations);
  }

  @Mutation(() => District)
  @Roles(RoleEnum.SUPER_ADMIN)
  updateDistrict(
    @Args('updateDistrictInput') updateDistrictInput: UpdateDistrictInput,
    @Context('req') req: any,
  ) {
    return this.districtService.update(
      updateDistrictInput.id,
      updateDistrictInput,
      [
        {
          field: 'name',
          unique: true,
          type: 'string',
        },
      ],
      req.user,
    );
  }

  @Mutation(() => District)
  @Roles(RoleEnum.SUPER_ADMIN)
  removeDistrict(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.districtService.remove(id, req.user);
  }

  @Query(()=> Int)
  countDistrict(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.districtService.count(
      filters,
      relationsToFilter,
    );
  }

  @Mutation(() => District)
  @Roles(RoleEnum.SUPER_ADMIN)
  verifyDistrict(
     @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'verified';
    const validationRule: ValidationRule = 
      {
        field: 'verified',
        required: true,
        type: 'boolean',
      }

    return this.districtService.updateColumn(fieldName,value,validationRule,req.user);
  }

  @Mutation(() => [District])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeDistricts(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.districtService.removeMany(ids,req.user);
  }
}
