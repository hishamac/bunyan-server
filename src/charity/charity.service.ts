import { Injectable } from '@nestjs/common';
import { Charity, Credential } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { CharityActivityService } from '../charity-activity/charity-activity.service';
import { CreateCharityInput } from 'src/charity/dto/create-charity.input';
import { UpdateCharityInput } from 'src/charity/dto/update-charity.input';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class CharityService extends BaseService<Charity> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    charityActivityService: CharityActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'charity',
      charityActivityService,
    );
  }

  async create(
    createCharityInput: CreateCharityInput,
    validationRule: any,
    user: Credential,
  ): Promise<Charity> {
    const data = {
      ...createCharityInput,
      createdById: user.id,
    };

    return super.create(data, validationRule, user);
  }

  async update(
    id: number,
    updateCharityInput: UpdateCharityInput,
    validationRule: any,
    user: Credential,
  ): Promise<Charity> {
    // check if the user is authorized to update the charity
    const charity = await this.prisma.charity.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!charity) {
      throw new Error('You are not authorized to update this charity');
    }

    return super.update(id, updateCharityInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Charity> {
    // check if the user is authorized to delete the charity
    const charity = await this.prisma.charity.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!charity) {
      throw new Error('You are not authorized to delete this charity');
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
    const charitys = await this.prisma.charity.findMany({
      where: {
        id: {
          in: ids,
        },
        createdById: actor?.id,
      },
    });

    if (charitys.length !== ids.length) {
      throw new Error('You are not authorized to delete some of the charitys');
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
      const charity = await this.prisma.charity.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!charity) {
        throw new Error('You are not authorized to view this charity');
      }
    }

    return super.findOne(id, field, relationsToInclude);
  }
}
