import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from '@prisma/client';
import { UpdateCategoryInput } from './dto/update-category.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
   ) {
    super(prisma, redis, queueProcessor, queueService, 'category');
  }

  
}
