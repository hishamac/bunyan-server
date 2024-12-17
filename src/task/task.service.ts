import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { Credential, RoleEnum, Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/update-task.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { TaskActivityService } from '../task-activity/task-activity.service';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    taskActivityService: TaskActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'task',
      taskActivityService,
    );
  }

  async findAll(
    limit?: number,
    offset?: number,
    filters?: { [key: string]: any },
    sort?: { field: string; direction: 'asc' | 'desc' },
    relationsToFilter?: { [key: string]: any },
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<
    {
      id: number;
      title: string;
      description: string;
      categoryId: number | null;
      badgeId: number | null;
      active: boolean;
      campaignId: number | null;
      yearId: number | null;
      verified: boolean;
      points: number | null;
      icon: string | null;
      startDate: Date;
      dueDate: Date;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const data = await super.findAll(
      limit,
      offset,
      filters,
      sort,
      relationsToFilter,
      relationsToInclude,
    );

    // get the task own participants of the tasks
    const taskIds = data.map((task) => task.id);
    let participants = [];
    if (user.role === RoleEnum.MAHALLU_ADMIN) {
      participants = await this.prisma.taskParticipant.findMany({
        where: {
          taskId: {
            in: taskIds,
          },
          mahalluId: user.mahalluId,
        },
        select: {
          id: true,
          claimed: true,
          verified: true,
          taskId: true,
        },
      });
    } else {
      participants = await this.prisma.taskParticipant.findMany({
        where: {
          taskId: {
            in: taskIds,
          },
        },
        select: {
          id: true,
          claimed: true,
          verified: true,
          taskId: true,
        },
      });
    }

    // give the data to the user , the taks and taks.participants as the participants of the task
    return data.map((task) => {
      return {
        ...task,
        participants: participants.filter(
          (participant) => participant.taskId === task.id,
        ),
      };
    });
  }

  async findOne(
    value: any,
    field?: string,
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<{
    id: number;
    title: string;
    description: string;
    categoryId: number | null;
    badgeId: number | null;
    active: boolean;
    campaignId: number | null;
    yearId: number | null;
    verified: boolean;
    points: number | null;
    icon: string | null;
    startDate: Date;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const task: any = await super.findOne(value, field, relationsToInclude);

    let participants = task.participants;
    // get the task own participants of the tasks
    if (user.role === RoleEnum.MAHALLU_ADMIN) {
      participants = await this.prisma.taskParticipant.findMany({
        where: {
          taskId: task.id,
          mahalluId: user.mahalluId,
        },
        select: {
          id: true,
          claimed: true,
          verified: true,
          taskId: true,
          title:true,
          description:true,
          files : true
        },
      });
    }
    

    // give the data to the user , the taks and taks.participants as the participants of the task
    return {
      ...task,
      participants,
    };
  }
}
