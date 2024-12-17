import { Injectable } from '@nestjs/common';
import { CreateDonationInput } from './dto/create-donation.input';
import { Donation } from '@prisma/client';
import { UpdateDonationInput } from './dto/update-donation.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { DonationActivityService } from '../donation-activity/donation-activity.service';

@Injectable()
export class DonationService extends BaseService<Donation> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    donationActivityService: DonationActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'donation',
      donationActivityService,
    );
  }
}
