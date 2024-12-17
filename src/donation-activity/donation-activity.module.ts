import { Module } from '@nestjs/common';
import { DonationActivityService } from './donation-activity.service';
import { DonationActivityResolver } from './donation-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('donationActivity')],
  providers: [DonationActivityResolver, DonationActivityService],
  exports: [DonationActivityService],
})
export class DonationActivityModule {}