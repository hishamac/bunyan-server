import { Module } from '@nestjs/common';
import { CommitteeActivityService } from './committee-activity.service';
import { CommitteeActivityResolver } from './committee-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('committeeActivity')],
  providers: [CommitteeActivityResolver, CommitteeActivityService],
  exports: [CommitteeActivityService],
})
export class CommitteeActivityModule {}