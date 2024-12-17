import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { Credential, Member } from '@prisma/client';
import { UpdateMemberInput } from './dto/update-member.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { MemberActivityService } from '../member-activity/member-activity.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class MemberService extends BaseService<Member> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    memberActivityService: MemberActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'member',
      memberActivityService,
    );
  }

  async checkRegNoExists(regNo: string): Promise<boolean> {
    const member = await this.prisma.member.findFirst({
      where: {
        regNo: regNo,
      },
    });

    return !!member;
  }

  async create(
    data: any,
    validationRules: any,
    user?: Credential,
  ) {
    // assign username and password from data to anywhere else and remove them from data
    const { familyId, ...rest } = data;
  
    // get the regNo from the family
    const family = await this.prisma.family.findUnique({
      where: {
        id: familyId,
      },
      select: {
        regNo: true,
      },
    });
  
    if (!family) {
      throw new Error('Mahallu not found');
    }
  
    // count the number of members in the family
    let familyCount = await this.prisma.member.count({
      where: {
        familyId,
      },
    });
  
    // generate the initial regNo
    let regNo = `${family.regNo}/${(familyCount + 1).toString().padStart(4, '0')}`;
  
    // check if the regNo already exists and keep generating a new one until it's unique
    while (true) {
      const memberRegNo = await this.prisma.member.findFirst({
        where: {
          regNo: regNo,
        },
      });
  
      if (!memberRegNo) {
        break; // regNo is unique, exit the loop
      }
  
      // if the regNo already exists, increment the last part and try again
      familyCount++;
      regNo = `${family.regNo}/${(familyCount + 1).toString().padStart(4, '0')}`;
    }
  
    // assign the new regNo to the data
    data.regNo = regNo;
    // remove username and password from data
    !data.createdById && (data.createdById = user.id);

    // user
    user.id = data.createdById;
  
    const member = await super.create(data, validationRules, user);
  
    return member;
  }
  
  

   async update(
        id: number,
        updateMemberInput: UpdateMemberInput,
        validationRule: any,
        user: Credential,
      ): Promise<Member> {
        // check if the user is authorized to update the member
        const member = await this.prisma.member.findUnique({
          where: {
            id: id,
            createdById: user.id,
          },
        });
    
        if (!member) {
          throw new Error('You are not authorized to update this member');
        }
    
        return super.update(id, updateMemberInput, validationRule, user);
      }
    
      async delete(id: number, user: Credential): Promise<Member> {
        // check if the user is authorized to delete the member
        const member = await this.prisma.member.findUnique({
          where: {
            id: id,
            createdById: user.id,
          },
        });
    
        if (!member) {
          throw new Error('You are not authorized to delete this member');
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
        const members = await this.prisma.member.findMany({
          where: {
            id: {
              in: ids,
            },
            createdById: actor?.id,
          },
        });
    
        if (members.length !== ids.length) {
          throw new Error('You are not authorized to delete some of the members');
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
          const member = await this.prisma.member.findUnique({
            where: {
              id: id,
              createdById: user.id,
            },
          });
    
          if (!member) {
            throw new Error('You are not authorized to view this member');
          }
        }
    
        return super.findOne(id, field, relationsToInclude);
      }

      findMemberByPhone(phone: string): Promise<Member> {
        return this.prisma.member.findFirst({
          where: {
            contact: phone,
          },
        });
      }

}
