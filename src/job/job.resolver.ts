import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Job)
@UseGuards(RolesGuard)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Job)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN)
  createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
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
        field: 'location',
        type: 'string',
      },
      {
        field: 'employmentType',
        required: true,
        type: 'string',
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'],
      },
      {
        field: 'locationType',
        required: true,
        type: 'string',
        enum: ['REMOTE', 'ONSITE', 'HYBRID'],
      },
      {
        field: 'salaryRange',
        required: true,
        type: 'string',
      },
      {
        field: 'skills',
        required: true,
        type: 'array',
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
        field: 'admin',
        required: true,
        type: 'boolean',
      },
      {
        field: 'postedDate',
        required: true,
        type: 'date',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      },
      {
        field: 'expirationDate',
        required: true,
        type: 'date',
      },
      {
        field: 'remarks',
        type: 'string',
      },
      {
        field: 'verified',
        required: true,
        type: 'boolean',
      },
    ]; // Empty validation rules
    return this.jobService.create(createJobInput, validationRules, req.user);
  }

  @Query(() => Int)
  @Roles(
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.SUPER_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
  )
  countJob(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.jobService.count(filters, relationsToFilter, req.user);
  }

  @Mutation(() => [Job])
  @Roles(
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
  )
  createManyJobs(
    @Args('createManyJobInput', { type: () => [CreateJobInput] })
    createManyJobInput: CreateJobInput[],
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
        field: 'location',
        type: 'string',
      },
      {
        field: 'employmentType',
        required: true,
        type: 'string',
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'],
      },
      {
        field: 'locationType',
        required: true,
        type: 'string',
        enum: ['REMOTE', 'ONSITE', 'HYBRID'],
      },
      {
        field: 'salaryRange',
        required: true,
        type: 'string',
      },
      {
        field: 'skills',
        required: true,
        type: 'array',
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
        field: 'admin',
        required: true,
        type: 'boolean',
      },
      {
        field: 'postedDate',
        required: true,
        type: 'date',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      },
      {
        field: 'expirationDate',
        required: true,
        type: 'date',
      },
      {
        field: 'remarks',
        type: 'string',
      },
      {
        field: 'verified',
        required: true,
        type: 'boolean',
      },
    ];
    return this.jobService.createMany(
      createManyJobInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => [Job], { name: 'jobs' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.USER,
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
    @Context('req') req: any,
    @Info() info: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.jobService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Job, { name: 'job' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.USER,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.jobService.findOne(id, 'id', relations, req.user);
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN, RoleEnum.ZONE_ADMIN)
  updateJob(
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
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
        field: 'location',
        type: 'string',
      },
      {
        field: 'employmentType',
        type: 'string',
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN'],
      },
      {
        field: 'locationType',
        type: 'string',
        enum: ['REMOTE', 'ONSITE', 'HYBRID'],
      },
      {
        field: 'salaryRange',
        type: 'string',
      },
      {
        field: 'skills',
        type: 'array',
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
        field: 'admin',
        type: 'boolean',
      },
      {
        field: 'postedDate',
        type: 'date',
      },
      {
        field: 'active',
        type: 'boolean',
      },
      {
        field: 'expirationDate',
        type: 'date',
      },
      {
        field: 'remarks',
        type: 'string',
      },
      {
        field: 'verified',
        type: 'boolean',
      },
    ]; // Empty validation rules
    return this.jobService.update(
      updateJobInput.id,
      updateJobInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN)
  removeJob(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.jobService.remove(id, req.user);
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  activeOrInactiveJob(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'active';
    const validationRule: ValidationRule = {
      field: 'active',
      required: true,
      type: 'boolean',
    };

    return this.jobService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  verifyJob(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'verified';
    const validationRule: ValidationRule = {
      field: 'verified',
      required: true,
      type: 'boolean',
    };

    return this.jobService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  addRemarks(
    @Args('value', { type: () => String }) value: string,
    @Context('req') req: any,
  ) {
    const fieldName = 'remarks';
    const validationRule: ValidationRule = {
      field: 'remarks',
      required: true,
      type: 'boolean',
    };

    return this.jobService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => Job)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  rejectJob(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'rejected';
    const validationRule: ValidationRule = {
      field: 'rejected',
      required: true,
      type: 'boolean',
    };

    return this.jobService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Job])
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  removeJobs(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.jobService.removeMany(ids, req.user);
  }
}
