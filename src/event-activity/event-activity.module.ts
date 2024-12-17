import { Module } from '@nestjs/common';
import { EventActivityService } from './event-activity.service';
import { EventActivityResolver } from './event-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('eventActivity')],
  providers: [EventActivityResolver, EventActivityService],
  exports: [EventActivityService],
})
export class EventActivityModule {}