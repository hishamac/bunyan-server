import { Module } from '@nestjs/common';
import { BadgeActivityService } from './badge-activity.service';
import { BadgeActivityResolver } from './badge-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('badgeActivity')],
  providers: [BadgeActivityResolver, BadgeActivityService],
  exports: [BadgeActivityService],
})
export class BadgeActivityModule {}