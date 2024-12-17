import { Injectable } from '@nestjs/common';
import { Badge } from '@prisma/client';
import { BadgeActivityService } from '../badge-activity/badge-activity.service';
import { BaseService } from '../base/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BadgeService extends BaseService<Badge> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    badgeActivityService: BadgeActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'badge',
      badgeActivityService,
    );
  }
}
