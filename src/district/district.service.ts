import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { Badge, Credential, District } from '@prisma/client';
import { DistrictActivityService } from '../district-activity/district-activity.service';
import { ValidationRule } from 'graphql';
import { CreateDistrictInput } from './dto/create-district.input';
import { RoleEnum } from 'src/enums/role';
import { CredentialService } from 'src/credential/credential.service';

@Injectable()
export class DistrictService extends BaseService<Badge> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    districtActivityService: DistrictActivityService,
    private readonly credentialService: CredentialService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'district',
      districtActivityService,
    );
  }

  async create(data: any, validationRules: any, user?: Credential) {
    // assign username and password from data to anywhere else and remove them from data
    const { username, password, ...rest } = data;
    
     // check the username is already exists
     const isUsernameExists = await this.credentialService.isUsernameExists(username);
 
     if (isUsernameExists) {
       throw new Error('Username already exists');
     }
    // remove username and password from data
    data = rest;

    const district = await super.create(data, validationRules, user);

    // after creating district , create a credential for the district
    await this.credentialService.create(
      {
        username,
        password,
        role: RoleEnum.DISTRICT_ADMIN,
        districtId: district.id,
        mahalluId: null,
        villageId: null,
        zoneId: null,
      },
      [],
      user,
    );

    return district;
  }

  async createMany(data: any[], validationRules: any, user?: Credential) {

    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules, user);
      districts.push(dt);
    }

    return districts;
  }
}
