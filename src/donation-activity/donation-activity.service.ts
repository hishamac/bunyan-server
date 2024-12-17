import { Injectable } from '@nestjs/common';
import { BaseActivityService } from '../base-activity/base-activity.service';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class DonationActivityService extends BaseActivityService{
  constructor(
    prismaService: PrismaService,
    redisService: RedisService,
  ) {
    super(prismaService, 'donationActivity', redisService);
  }
}