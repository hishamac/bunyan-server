import { Module } from '@nestjs/common';
import { CampaignActivityService } from './campaign-activity.service';
import { CampaignActivityResolver } from './campaign-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('campaignActivity')],
  providers: [CampaignActivityResolver, CampaignActivityService],
  exports: [CampaignActivityService],
})
export class CampaignActivityModule {}