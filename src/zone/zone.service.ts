import { Injectable } from '@nestjs/common';
import { CreateZoneInput } from './dto/create-zone.input';
import { Credential, Zone } from '@prisma/client';
import { UpdateZoneInput } from './dto/update-zone.input';
import { BaseService } from '../base/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { ZoneActivityService } from '../zone-activity/zone-activity.service';
import { RoleEnum } from 'src/enums/role';
import { CredentialService } from 'src/credential/credential.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class ZoneService extends BaseService<Zone> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    zoneActivityService: ZoneActivityService,
    private readonly credentialService: CredentialService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'zone',
      zoneActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (user && user.role === RoleEnum.VILLAGE_ADMIN) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }
    return super.count(authorizedFilter, relationsToFilter);
  }

  async create(data: any, validationRules: any, user?: Credential) {
    // assign username and password from data to anywhere else and remove them from data
    const { username, password, ...rest } = data;
    console.log(user);

    // check the username is already exists
    const isUsernameExists =
      await this.credentialService.isUsernameExists(username);

    if (isUsernameExists) {
      throw new Error('Username already exists');
    }

    // remove username and password from data
    data = rest;
    !data.createdById && (data.createdById = user.id);

    // user
    user.id = data.createdById;

    const zone = await super.create(data, validationRules, user);

    // after creating zone , create a credential for the zone
    await this.credentialService.create(
      {
        username,
        password,
        role: RoleEnum.DISTRICT_ADMIN,
        districtId: null,
        mahalluId: null,
        villageId: null,
        zoneId: zone.id,
      },
      [],
      user,
    );

    return zone;
  }

  async update(
    id: number,
    updateZoneInput: UpdateZoneInput,
    validationRule: any,
    user: Credential,
  ): Promise<Zone> {
    // check if the user is authorized to update the zone
    console.log(user);

    if (user.role !== RoleEnum.SUPER_ADMIN) {
      const zone = await this.prisma.zone.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!zone) {
        throw new Error('You are not authorized to update this zone');
      }
    }

    return super.update(id, updateZoneInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Zone> {
    // check if the user is authorized to delete the zone

    if (user.role !== RoleEnum.SUPER_ADMIN) {
      const zone = await this.prisma.zone.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!zone) {
        throw new Error('You are not authorized to delete this zone');
      }
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

  //   // check the username is already exists
  //   const isUsernameExists = await this.credentialService.isUsernameExists(
  //     dataWithActor[0].username,
  //   );

  //   if (isUsernameExists) {
  //     throw new Error('Username already exists');
  //   }

  //   // remove username and password from data
  //   dataWithActor.forEach((d) => {
  //     const { username, password, ...rest } = d;
  //     d = rest;
  //   });

  //   const zones = await super.createMany(dataWithActor, validationRules, actor);

  //   // after creating zones , create a credential for the zones

  //   await Promise.all(
  //     zones.map(async (zone) => {
  //       await this.credentialService.create(
  //         {
  //           username: dataWithActor[0].username,
  //           password: dataWithActor[0].password,
  //           role: RoleEnum.DISTRICT_ADMIN,
  //           districtId: null,
  //           mahalluId: null,
  //           villageId: null,
  //           zoneId: zone.id,
  //         },
  //         [],
  //         actor,
  //       );
  //     }),
  //   );

  //   return zones;
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
    if (actor.role !== RoleEnum.SUPER_ADMIN) {
      const zones = await this.prisma.zone.findMany({
        where: {
          id: {
            in: ids,
          },
          createdById: actor?.id,
        },
      });

      if (zones.length !== ids.length) {
        throw new Error('You are not authorized to delete these zones');
      }
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
    if (user && user.role === RoleEnum.DISTRICT_ADMIN) {
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
}
