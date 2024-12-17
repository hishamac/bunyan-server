import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignResolver } from './campaign.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CampaignActivityModule } from '../campaign-activity/campaign-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('campaign'),
    CampaignActivityModule,
    CredentialModule,
  ],
  providers: [CampaignResolver, CampaignService],
})
export class CampaignModule {}
