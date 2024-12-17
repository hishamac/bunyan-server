import { Injectable } from '@nestjs/common';
import { CreateFamilyInput } from './dto/create-family.input';
import { Credential, Family } from '@prisma/client';
import { UpdateFamilyInput } from './dto/update-family.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { FamilyActivityService } from '../family-activity/family-activity.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class FamilyService extends BaseService<Family> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    familyActivityService: FamilyActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'family',
      familyActivityService,
    );
  }

  async create(data: any, validationRules: any, user?: Credential) {
    // assign username and password from data to anywhere else and remove them from data
    const { mahalluId, ...rest } = data;

    // get the regNo from the mahallu
    const mahallu = await this.prisma.mahallu.findUnique({
      where: {
        id: mahalluId,
      },
      select: {
        regNo: true,
      },
    });

    if (!mahallu) {
      throw new Error('Mahallu not found');
    }

    // create the reg no dynamically to the family , the reg no will be like this : mahalluRegNo/familyCount

    const familyCount = await this.prisma.family.count({
      where: {
        mahalluId,
      },
    });

    // the reg no of the family on familyCount should be 4 digit , if the familyCount is 1 then the reg no should be 0001

    const regNo = `${mahallu.regNo}/${(familyCount + 1).toString().padStart(4, '0')}`;

    data.regNo = regNo;

    delete data.mahalluId;

    data.mahallu = {
      connect: {
        id: mahalluId,
      },
    };

    data.createdBy = {
      connect: {
        id: user.id,
      },
    };

    // remove username and password from data
    // !data.createdById && (data.createdById = user.id);

    // user
    // user.id 

    const family = await super.create(data, validationRules, user);

    return family;
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

  async update(
    id: number,
    updateFamilyInput: UpdateFamilyInput,
    validationRule: any,
    user: Credential,
  ): Promise<Family> {
    // check if the user is authorized to update the family
    const family = await this.prisma.family.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!family) {
      throw new Error('You are not authorized to update this family');
    }

    return super.update(id, updateFamilyInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Family> {
    // check if the user is authorized to delete the family
    const family = await this.prisma.family.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!family) {
      throw new Error('You are not authorized to delete this family');
    }

    return super.remove(id, user);
  }

  // async createMany(
  //   data: any[],
  //   validationRules: ValidationRule[],
  //   actor?: Credential,
  // ): Promise<any[]> {
  //   const dataWithActor = data.map((d) => ({
  //     ...d,
  //     createdById: actor?.id,
  //   }));

  //   return super.createMany(dataWithActor, validationRules, actor);
  // }

  async createMany(data: any[], validationRules: any, user?: Credential) {

    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules, user);
      districts.push(dt);
    }

    return districts;
  }

  async removeMany(ids: number[], actor?: Credential): Promise<void> {
    const familys = await this.prisma.family.findMany({
      where: {
        id: {
          in: ids,
        },
        createdById: actor?.id,
      },
    });

    if (familys.length !== ids.length) {
      throw new Error('You are not authorized to delete some of the familys');
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
      const family = await this.prisma.family.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!family) {
        throw new Error('You are not authorized to view this family');
      }
    }

    return super.findOne(id, field, relationsToInclude);
  }
}
