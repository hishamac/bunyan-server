import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { OtherProgramService } from './other-program.service';
import { OtherProgram } from './entities/other-program.entity';
import { CreateOtherProgramInput } from './dto/create-other-program.input';
import { UpdateOtherProgramInput } from './dto/update-other-program.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => OtherProgram)
@UseGuards(RolesGuard)
export class OtherProgramResolver {
  constructor(private readonly otherProgramService: OtherProgramService) {}

  @Mutation(() => OtherProgram)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createOtherProgram(
    @Args('createOtherProgramInput')
    createOtherProgramInput: CreateOtherProgramInput,
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
        field: 'files',
        required: true,
        type: 'array',
      },
    ]; // Empty validation rules
    return this.otherProgramService.create(
      createOtherProgramInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [OtherProgram])
        @Roles(RoleEnum.DISTRICT_ADMIN)
        createManyOtherPrograms(
          @Args('createManyOtherProgramInput', { type: () => [CreateOtherProgramInput] })
          createManyOtherProgramInput: CreateOtherProgramInput[],
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
          return this.otherProgramService.createMany(createManyOtherProgramInput, validationRules, req.user);
        }

  @Query(() => [OtherProgram], { name: 'otherPrograms' })
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
    const allowedRelations: string[] = ['category', 'mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.otherProgramService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => OtherProgram, { name: 'otherProgram' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['category', 'mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.otherProgramService.findOne(id, 'id', relations);
  }

  @Mutation(() => OtherProgram)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.VILLAGE_ADMIN)
  updateOtherProgram(
    @Args('updateOtherProgramInput')
    updateOtherProgramInput: UpdateOtherProgramInput,
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
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'files',
        type: 'array',
      },
    ]; // Empty validation rules
    return this.otherProgramService.update(
      updateOtherProgramInput.id,
      updateOtherProgramInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => OtherProgram)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeOtherProgram(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.otherProgramService.remove(id, req.user);
  }

  @Query(() => [OtherProgram], {
    name: 'getFromOtherProgramsOnMyVillage',
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
    return this.otherProgramService.getFromMyVillage(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relationsToInclude,
      req.user,
    );
  }

  // verifyOtherProgram

  @Mutation(() => OtherProgram)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  verifyOtherProgram(
    @Args('id', { type: () => Int }) id: number,
    @Args('points', { type: () => Int }) points: number,
    @Context('req') req: any,
  ) {
    return this.otherProgramService.verifyOtherProgram(id,points,req.user);
  }

  @Mutation(() => OtherProgram)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  claimOtherProgram(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.otherProgramService.claimOtherProgram(id,req.user);
  }
}
