import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { TaskActivityModule } from '../task-activity/task-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('task'),
    TaskActivityModule,
    CredentialModule,
  ],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
