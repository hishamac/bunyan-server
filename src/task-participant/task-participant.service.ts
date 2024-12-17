import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { Credential, RoleEnum, TaskParticipant } from '@prisma/client';
import { TaskParticipantActivityService } from '../task-participant-activity/task-participant-activity.service';

@Injectable()
export class TaskParticipantService extends BaseService<TaskParticipant> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    taskParticipantActivityService: TaskParticipantActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'taskParticipant',
      taskParticipantActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    if (user.role === RoleEnum.MAHALLU_ADMIN) {
      filters = {
        ...filters,
        mahalluId: user.mahalluId,
      };
    }

    return super.count(filters, relationsToFilter);
  }

  async getFromMyVillage(
    limit?: number,
    offset?: number,
    filters?: { [key: string]: any },
    sort?: { field: string; direction: 'asc' | 'desc' },
    relationsToFilter?: { [key: string]: any },
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<TaskParticipant[]> {
    // Validate user has permission to access village data
    console.log('user', user);

    if (!user || !user.villageId) {
      throw new Error('Unauthorized: User must be associated with a village');
    }

    // Prepare the base query conditions
    const whereCondition: any = {
      mahallu: {
        villageId: user.villageId, // Ensure we only fetch task participants from the user's village
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
      const taskParticipants = await this.prisma.taskParticipant.findMany({
        where: whereCondition,
        orderBy: orderBy,
        take: limit,
        skip: offset,
        include: {
          task: {
            include: {
              category: true,
              campaign: true,
              year: true,
              participants: true,
              badge: true,
            },
          },
          mahallu: true,
        },
      });

      return taskParticipants;
    } catch (error) {
      console.error('Error fetching task participants:', error);
      throw new Error('Failed to retrieve task participants');
    }
  }

  async verifyTaskParticipant(
    id: number,
    user: Credential,
  ): Promise<TaskParticipant> {
    // Ensure user has permission to verify task participants
    if (!user || user.role !== RoleEnum.VILLAGE_ADMIN) {
      throw new Error(
        'Unauthorized: User must be a village admin to verify task participants',
      );
    }

    // check the task participant exists
    const taskParticipant = await this.prisma.taskParticipant.findUnique({
      where: { id },
    });

    if (!taskParticipant) {
      throw new Error('Task participant not found');
    }

    // Verify the task participant
    return this.update(id, { verified: true }, [], user);
  }

  async claimTaskParticipant(
    id: number,
    user: Credential,
  ): Promise<TaskParticipant> {
    // Ensure user has permission to verify task participants
    if (!user || user.role !== RoleEnum.MAHALLU_ADMIN) {
      throw new Error(
        'Unauthorized: User must be a mahallu admin to verify task participants',
      );
    }

    // check the task participant exists
    const taskParticipant = await this.prisma.taskParticipant.findUnique({
      where: { id },
    });

    if (!taskParticipant) {
      throw new Error('Task participant not found');
    }

    // check if its already claimed
    if (taskParticipant.claimed) {
      throw new Error('Points already claimed');
    }

    // add task.points to the mahallu of the user also if task have for that task add that badge to that mahallu

    const mahallu = await this.prisma.mahallu.findUnique({
      where: { id: user.mahalluId },
    });

    if (!mahallu) {
      throw new Error('Mahallu not found');
    }

    if (!taskParticipant.taskId) {
      throw new Error('Task not found');
    }

    // get the task
    const task = await this.prisma.task.findUnique({
      where: { id: taskParticipant.taskId },
      include: {
        badge: true,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    // if badge is there add that badge to the mahallu

    if (task.badgeId) {
      await this.prisma.mahallu.update({
        where: { id: user.mahalluId },
        data: {
          badges: {
            connect: {
              id: task.badgeId,
            },
          },
          totalPoints: {
            increment: task.points,
          },
        },
      });
    } else {
      // add the points to the mahallu
      await this.prisma.mahallu.update({
        where: { id: user.mahalluId },
        data: {
          totalPoints: {
            increment: task.points,
          },
        },
      });
    }

    // Verify the task participant
    return this.update(id, { claimed: true }, [], user);
  }
}
