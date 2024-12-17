import { Injectable } from '@nestjs/common';
import { CreateYearInput } from './dto/create-year.input';
import { Year } from '@prisma/client';
import { UpdateYearInput } from './dto/update-year.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { YearActivityService } from '../year-activity/year-activity.service';

@Injectable()
export class YearService extends BaseService<Year> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    yearActivityService: YearActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'year',
      yearActivityService,
    );
  }
  
}
