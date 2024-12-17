import { Injectable } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { Expense } from '@prisma/client';
import { UpdateExpenseInput } from './dto/update-expense.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class ExpenseService extends BaseService<Expense> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
   ) {
    super(prisma, redis, queueProcessor, queueService, 'expense');
  }

  
}
