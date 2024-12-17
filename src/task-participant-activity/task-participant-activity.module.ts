import { Module } from '@nestjs/common';
import { TaskParticipantActivityService } from './task-participant-activity.service';
import { TaskParticipantActivityResolver } from './task-participant-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('taskActivity')],
  providers: [TaskParticipantActivityResolver, TaskParticipantActivityService],
  exports: [TaskParticipantActivityService],
})
export class TaskParticipantActivityModule {}