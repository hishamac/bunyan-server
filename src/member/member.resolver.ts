import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';

@Resolver(() => Member)
@UseGuards(RolesGuard)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      { field: 'regNo', required: true, type: 'string', unique: true },
      {
        field: 'familyId',
        type: 'number',
        reference: { model: 'family', field: 'id' },
      },
      { field: 'contact', type: 'string' },
      { field: 'name', required: true, type: 'string' },
      { field: 'relationToHouseHolder', type: 'string' },
      {
        field: 'gender',
        required: true,
        type: 'string',
        enum: ['MALE', 'FEMALE', 'OTHER'],
      },
      { field: 'bloodGroup', type: 'string' },
      { field: 'yearOfBirth', type: 'date' },
      { field: 'healthCondition', type: 'string' },
      {
        field: 'maritalStatus',
        type: 'string',
        enum: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED'],
      },
      { field: 'job', type: 'string' },
      { field: 'jobSector', type: 'string' },
      { field: 'abroad', type: 'boolean' },
      { field: 'abroadPlace', type: 'string' },
      { field: 'skills', type: 'array' },
      { field: 'orphan', type: 'boolean' },
      { field: 'islamicQualification', type: 'string' },
      { field: 'generalQualification', type: 'string' },
      { field: 'remarks', type: 'string' },
    ];
    return this.memberService.create(
      createMemberInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [Member])
   @Roles(RoleEnum.MAHALLU_ADMIN , RoleEnum.DISTRICT_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.SUPER_ADMIN)
        createManyMembers(
          @Args('createManyMemberInput', { type: () => [CreateMemberInput] })
          createManyMemberInput: CreateMemberInput[],
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
          return this.memberService.createMany(createManyMemberInput, validationRules, req.user);
        }

  @Query(() => Int)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  countMember(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.memberService.count(filters, relationsToFilter);
  }

  @Query(() => [Member], { name: 'members' })
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
    const allowedRelations: string[] = [];
    const relations = extractRelations(fields, allowedRelations);

    return this.memberService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Member, { name: 'member' })
  @Roles(RoleEnum.MAHALLU_ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'family',
      'family.mahallu',
      'family.mahallu.zone',
      'family.mahallu.zone.district',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.memberService.findOne(id, 'id', relations);
  }

  @Mutation(() => Member)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
    @Context('req') req: any,
  ) {
    return this.memberService.update(
      updateMemberInput.id,
      updateMemberInput,
      [
        {
          field: 'familyId',
          type: 'number',
          reference: { model: 'family', field: 'id' },
        },
        { field: 'contact', type: 'string' },
        { field: 'name', type: 'string' },
        { field: 'relationToHouseHolder', type: 'string' },
        {
          field: 'gender',
          type: 'string',
          enum: ['MALE', 'FEMALE', 'OTHER'],
        },
        { field: 'bloodGroup', type: 'string' },
        { field: 'yearOfBirth', type: 'date' },
        { field: 'healthCondition', type: 'string' },
        {
          field: 'maritalStatus',
          type: 'string',
          enum: ['MARRIED', 'UNMARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED'],
        },
        { field: 'job', type: 'string' },
        { field: 'jobSector', type: 'string' },
        { field: 'abroad', type: 'boolean' },
        { field: 'abroadPlace', type: 'string' },
        { field: 'skills', type: 'array' },
        { field: 'orphan', type: 'boolean' },
        { field: 'islamicQualification', type: 'string' },
        { field: 'generalQualification', type: 'string' },
        { field: 'remarks', type: 'string' },
      ],
      req.user,
    );
  }

  @Mutation(() => Member)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeMember(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.memberService.remove(id, req.user);
  }

  @Mutation(() => Member)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  verifyMember(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'verified';
    const validationRule: ValidationRule = {
      field: 'verified',
      required: true,
      type: 'boolean',
    };

    return this.memberService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Member])
  @Roles(RoleEnum.MAHALLU_ADMIN)
  removeMembers(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.memberService.removeMany(ids, req.user);
  }

  @Mutation(() => Member)
  findMemberByPhone(@Args('phone') phone: string) {
    return this.memberService.findMemberByPhone(phone);
  }
}
