import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input';
import { $Enums, Credential, Job } from '@prisma/client';
import { UpdateJobInput } from './dto/update-job.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { JobActivityService } from '../job-activity/job-activity.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class JobService extends BaseService<Job> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    jobActivityService: JobActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'job',
      jobActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (filters && !filters.mahalluId && user) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }

    return super.count(authorizedFilter, relationsToFilter);
  }

  async create(
    createJobInput: CreateJobInput,
    validationRule: any,
    user: Credential,
  ): Promise<Job> {
    const data = {
      ...createJobInput,
      // createdById: user.id,
    };

    !data.createdById && (data.createdById = user.id);

    // user
    user.id = data.createdById;

    return super.create(data, validationRule, user);
  }

  async update(
    id: number,
    updateJobInput: UpdateJobInput,
    validationRule: any,
    user: Credential,
  ): Promise<Job> {
    // check if the user is authorized to update the job
    const job = await this.prisma.job.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!job) {
      throw new Error('You are not authorized to update this job');
    }

    return super.update(id, updateJobInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Job> {
    // check if the user is authorized to delete the job
    const job = await this.prisma.job.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!job) {
      throw new Error('You are not authorized to delete this job');
    }

    return super.remove(id, user);
  }

  async createMany(data: any[], validationRules: any, user?: Credential) {

    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules, user);
      districts.push(dt);
    }

    return districts;
  }

  // async createMany(
  //   data: any[],
  //   validationRules: ValidationRule[],
  //   actor?: Credential,
  // ): Promise<
  //   {
  //     id: number;
  //     title: string;
  //     description: string;
  //     location: string | null;
  //     employmentType: $Enums.EmploymentTypeEnum;
  //     locationType: $Enums.LocationTypeEnum;
  //     salaryRange: string;
  //     mahalluId: number | null;
  //     skills: string[];
  //     admin: boolean;
  //     postedDate: Date;
  //     active: boolean;
  //     expirationDate: Date;
  //     remarks: string | null;
  //     verified: boolean;
  //     createdById: number | null;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   }[]
  // > {
  //   const districts = [];

  //   for (let i = 0; i < data.length; i++) {
  //     let dt = await this.create(data[i], validationRules, actor);
  //     districts.push(dt);
  //   }

  //   return districts;
  // }

  async removeMany(ids: number[], actor?: Credential): Promise<void> {
    const jobs = await this.prisma.job.findMany({
      where: {
        id: {
          in: ids,
        },
        createdById: actor?.id,
      },
    });

    if (jobs.length !== ids.length) {
      throw new Error('You are not authorized to delete some of the jobs');
    }

    return super.removeMany(ids, actor);
  }

  async findAll(
    limit?: number,
    offset?: number,
    filters?: { [key: string]: any },
    sort?: { field: string; direction: 'asc' | 'desc' },
    relationsToFilter?: { [key: string]: any },
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<any[]> {
    // add filter for createdById
    let authorizedFilter = filters;
    if (filters && !filters.mahalluId && user) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }

    return super.findAll(
      limit,
      offset,
      authorizedFilter,
      sort,
      relationsToFilter,
      relationsToInclude,
    );
  }

  async findOne(
    id: number,
    field?: string,
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<any> {
    if (user) {
      const job = await this.prisma.job.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!job) {
        throw new Error('You are not authorized to view this job');
      }
    }

    return super.findOne(id, field, relationsToInclude);
  }
}
