import { Module } from '@nestjs/common';
import { TaskParticipantService } from './task-participant.service';
import { TaskParticipantResolver } from './task-participant.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { TaskParticipantActivityModule } from '../task-participant-activity/task-participant-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('taskParticipant'),
    TaskParticipantActivityModule,
    CredentialModule,
  ],
  providers: [TaskParticipantResolver, TaskParticipantService],
})
export class TaskParticipantModule {}
