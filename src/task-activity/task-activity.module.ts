import { Module } from '@nestjs/common';
import { TaskActivityService } from './task-activity.service';
import { TaskActivityResolver } from './task-activity.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RedisModule,PrismaModule],
  providers: [TaskActivityResolver, TaskActivityService],
  exports: [TaskActivityService],
})
export class TaskActivityModule {}

