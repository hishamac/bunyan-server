import { Injectable } from '@nestjs/common';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { Campaign } from '@prisma/client';
import { UpdateCampaignInput } from './dto/update-campaign.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { CampaignActivityService } from '../campaign-activity/campaign-activity.service';

@Injectable()
export class CampaignService extends BaseService<Campaign> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    campaignActivityService: CampaignActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'campaign',
      campaignActivityService,
    );
  }
}
