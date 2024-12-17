import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCredentialInput } from './dto/create-credential.input';
import { Credential } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { RoleEnum } from '@prisma/client';
import { comparePasswords, hashPassword } from '../utils/hash';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CredentialService extends BaseService<Credential> {
  constructor(
    redisService: RedisService,
    prisma: PrismaService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
  ) {
    super(prisma, redisService, queueProcessor, queueService, 'credential');
  }

  async create(
    createCredentialInput: CreateCredentialInput,
    validationRules: any,
    user?: any,
  ) {
    console.log(createCredentialInput);
    console.log(user);
    
    
    // if role = SUPER_ADMIN, set zoneId to null , districtId to null , mahalluId to null , villageId to null
    if (createCredentialInput.role === RoleEnum.SUPER_ADMIN) {
      createCredentialInput.zoneId = null;
      createCredentialInput.districtId = null;
      createCredentialInput.mahalluId = null;
      createCredentialInput.villageId = null;
    } else if (createCredentialInput.role === RoleEnum.ZONE_ADMIN) {
      // check if zoneId is null, if null throw error and check the zoneId is valid
      if (!createCredentialInput.zoneId) {
        throw new Error('ZoneId is required');
      }

      // check if zoneId is valid
      const zone = await this.prisma.zone.findUnique({
        where: {
          id: createCredentialInput.zoneId,
        },
      });

      if (!zone) {
        throw new Error('ZoneId is invalid');
      }

      createCredentialInput.districtId = null;
      createCredentialInput.mahalluId = null;
      createCredentialInput.villageId = null;
    } else if (createCredentialInput.role === RoleEnum.DISTRICT_ADMIN) {
      // check if districtId is null, if null throw error and check the districtId is valid
      if (!createCredentialInput.districtId) {
        throw new Error('DistrictId is required');
      }

      // check if districtId is valid
      const district = await this.prisma.district.findUnique({
        where: {
          id: createCredentialInput.districtId,
        },
      });

      if (!district) {
        throw new Error('DistrictId is invalid');
      }

      createCredentialInput.zoneId = null;
      createCredentialInput.mahalluId = null;
      createCredentialInput.villageId = null;
    } else if (createCredentialInput.role === RoleEnum.MAHALLU_ADMIN) {
      // check if mahalluId is null, if null throw error and check the mahalluId is valid
      if (!createCredentialInput.mahalluId) {
        throw new Error('MahalluId is required');
      }

      // check if mahalluId is valid
      const mahallu = await this.prisma.mahallu.findUnique({
        where: {
          id: createCredentialInput.mahalluId,
        },
      });

      if (!mahallu) {
        throw new Error('MahalluId is invalid');
      }
      createCredentialInput.zoneId = null;
      createCredentialInput.districtId = null;
      createCredentialInput.villageId = null;
    } else if (createCredentialInput.role === RoleEnum.VILLAGE_ADMIN) {
      // check if villageId is null, if null throw error and check the villageId is valid
      if (!createCredentialInput.villageId) {
        throw new Error('VillageId is required');
      }

      // check if villageId is valid
      const village = await this.prisma.village.findUnique({
        where: {
          id: createCredentialInput.villageId,
        },
      });

      if (!village) {
        throw new Error('VillageId is invalid');
      }

      createCredentialInput.zoneId = null;
      createCredentialInput.districtId = null;
      createCredentialInput.mahalluId = null;
    }

    const hashedPassword = await hashPassword(createCredentialInput.password);
    createCredentialInput.password = hashedPassword;

    return await super.create(createCredentialInput, validationRules, user);
  }

  async login(
    username: string,
    password: string,
  ): Promise<string | null> {
    // Retrieve user credentials from the database
    const user = await this.prisma.credential.findFirst({
      where: {
        username
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Compare provided password with the stored hash
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET , {
      expiresIn: '24h',
    });

    // Return the token for header-based use
    return token;
  }

  async verifyUser(username: string): Promise<any> {
    return await this.prisma.credential.findFirst({
      where: {
        username,
      },
    });
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.credential.findFirst({
      where: {
        username,
      },
    });

    return !!user;
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.prisma.credential.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePasswords(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.prisma.credential.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  }
}
