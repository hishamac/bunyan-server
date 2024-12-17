import { Injectable } from '@nestjs/common';
import { CreateCommitteeInput } from './dto/create-committee.input';
import { Committee, Credential } from '@prisma/client';
import { UpdateCommitteeInput } from './dto/update-committee.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { CommitteeActivityService } from '../committee-activity/committee-activity.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class CommitteeService extends BaseService<Committee> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    committeeActivityService: CommitteeActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'committee',
      committeeActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (user) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }
    return super.count(authorizedFilter, relationsToFilter);
  }

  
    async create(
      createCommitteeInput: CreateCommitteeInput,
      validationRule: any,
      user: Credential,
    ): Promise<Committee> {
      const data = {
        ...createCommitteeInput,
        createdById: user.id,
      };
  
      return super.create(data, validationRule, user);
    }
  
    async update(
      id: number,
      updateCommitteeInput: UpdateCommitteeInput,
      validationRule: any,
      user: Credential,
    ): Promise<Committee> {
      // check if the user is authorized to update the committee
      const committee = await this.prisma.committee.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });
  
      if (!committee) {
        throw new Error('You are not authorized to update this committee');
      }
  
      return super.update(id, updateCommitteeInput, validationRule, user);
    }
  
    async delete(id: number, user: Credential): Promise<Committee> {
      // check if the user is authorized to delete the committee
      const committee = await this.prisma.committee.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });
  
      if (!committee) {
        throw new Error('You are not authorized to delete this committee');
      }
  
      return super.remove(id, user);
    }
  
    async createMany(
      data: any[],
      validationRules: ValidationRule[],
      actor?: Credential,
    ): Promise<any[]> {
      const dataWithActor = data.map((d) => ({
        ...d,
        createdById: actor?.id,
      }));
  
      return super.createMany(dataWithActor, validationRules, actor);
    }
  
    async removeMany(ids: number[], actor?: Credential): Promise<void> {
      const committees = await this.prisma.committee.findMany({
        where: {
          id: {
            in: ids,
          },
          createdById: actor?.id,
        },
      });
  
      if (committees.length !== ids.length) {
        throw new Error('You are not authorized to delete some of the committees');
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
      if (user) {
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
        const committee = await this.prisma.committee.findUnique({
          where: {
            id: id,
            createdById: user.id,
          },
        });
  
        if (!committee) {
          throw new Error('You are not authorized to view this committee');
        }
      }
  
      return super.findOne(id, field, relationsToInclude);
    }
}
