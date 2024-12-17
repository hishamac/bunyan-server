import { Injectable } from '@nestjs/common';
import { CreateTaskCategoryInput } from './dto/create-task-category.input';
import { UpdateTaskCategoryInput } from './dto/update-task-category.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { TaskCategory } from '@prisma/client';
import { TaskCategoryActivityService } from '../task-category-activity/task-category-activity.service';

@Injectable()
export class TaskCategoryService extends BaseService<TaskCategory> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    taskCategoryActivityService: TaskCategoryActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'taskCategory',
      taskCategoryActivityService,
    );
  }
}
