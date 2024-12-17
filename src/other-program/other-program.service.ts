import { Injectable } from '@nestjs/common';
import { CreateOtherProgramInput } from './dto/create-other-program.input';
import { UpdateOtherProgramInput } from './dto/update-other-program.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { Credential, OtherProgram, RoleEnum } from '@prisma/client';
import { OtherProgramActivityService } from '../other-program-activity/other-program-activity.service';

@Injectable()
export class OtherProgramService extends BaseService<OtherProgram> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    otherProgramActivityService: OtherProgramActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'otherProgram',
      otherProgramActivityService,
    );
  }

   async getFromMyVillage(
      limit?: number,
      offset?: number,
      filters?: { [key: string]: any },
      sort?: { field: string; direction: 'asc' | 'desc' },
      relationsToFilter?: { [key: string]: any },
      relationsToInclude?: string[],
      user?: Credential,
    ): Promise<OtherProgram[]> {
      // Validate user has permission to access village data
      console.log('user', user);
  
      if (!user || !user.villageId) {
        throw new Error('Unauthorized: User must be associated with a village');
      }
  
      // Prepare the base query conditions
      const whereCondition: any = {
        mahallu: {
          villageId: user.villageId, // Ensure we only fetch Activities from the user's village
        },
      };
  
      // Apply additional filters if provided
      if (filters) {
        Object.keys(filters).forEach((key) => {
          whereCondition[key] = filters[key];
        });
      }
  
      // Handle relation-based filters
      if (relationsToFilter) {
        Object.keys(relationsToFilter).forEach((relation) => {
          whereCondition[relation] = relationsToFilter[relation];
        });
      }
  
      // Prepare sorting
      const orderBy = sort
        ? { [sort.field]: sort.direction }
        : { createdAt: 'desc' as const }; // Default sorting
  
      // Prepare include for relations
      const include: any = {};
      if (relationsToInclude) {
        relationsToInclude.forEach((relation) => {
          include[relation] = true;
        });
      }
  
      try {
        // Execute the query
        const otherPrograms = await this.prisma.otherProgram.findMany({
          where: whereCondition,
          orderBy: orderBy,
          take: limit,
          skip: offset,
          include: {
            category: true,
            mahallu: true,
          },
        });
  
        return otherPrograms;
      } catch (error) {
        console.error('Error fetching Activities:', error);
        throw new Error('Failed to retrieve Activities');
      }
    }


  async verifyOtherProgram(
    id: number,
    points: number,
    user: Credential,
  ): Promise<OtherProgram> {
    // Ensure user has permission to verify Activity
    if (!user || user.role !== RoleEnum.VILLAGE_ADMIN) {
      throw new Error(
        'Unauthorized: User must be a village admin to verify Activity',
      );
    }

    // check the activity exists
    const otherProgram = await this.prisma.otherProgram.findUnique({
      where: { id },
    });

    if (!otherProgram) {
      throw new Error('Activity not found');
    }

    // Verify the activity
    return this.update(id, { verified: true, points }, [], user);
  }

  async claimOtherProgram(id: number, user: Credential): Promise<OtherProgram> {
    // Ensure user has permission to verify Activity
    if (!user || user.role !== RoleEnum.MAHALLU_ADMIN) {
      throw new Error(
        'Unauthorized: User must be a mahallu admin to verify Activity',
      );
    }

    // check the activity exists
    const otherProgram = await this.prisma.otherProgram.findUnique({
      where: { id },
    });

    if (!otherProgram) {
      throw new Error('Activity not found');
    }

    // check if its already claimed
    if (otherProgram.claimed) {
      throw new Error('Activity already claimed');
    }

    // add points to the mahallu of the user
    const mahallu = await this.prisma.mahallu.findUnique({
      where: { id: user.mahalluId },
    });

    if (!mahallu) {
      throw new Error('Mahallu not found');
    }

    await this.prisma.mahallu.update({
      where: { id: user.mahalluId },
      data: { totalPoints : mahallu.totalPoints + otherProgram.points },
    });

    // Verify the activity
    return this.update(id, { claimed: true }, [], user);
  }
}
