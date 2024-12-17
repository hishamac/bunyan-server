import { Injectable } from '@nestjs/common';
import { CreateIncomeInput } from './dto/create-income.input';
import { Income } from '@prisma/client';
import { UpdateIncomeInput } from './dto/update-income.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class IncomeService extends BaseService<Income> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
   ) {
    super(prisma, redis, queueProcessor, queueService, 'income');
  }

  
}
