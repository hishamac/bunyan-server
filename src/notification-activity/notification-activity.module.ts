import { Module } from '@nestjs/common';
import { NotificationActivityService } from './notification-activity.service';
import { NotificationActivityResolver } from './notification-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('notificationActivity')],
  providers: [NotificationActivityResolver, NotificationActivityService],
  exports: [NotificationActivityService],
})
export class NotificationActivityModule {}