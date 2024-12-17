import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryResolver } from './task-category.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';
import { TaskCategoryActivityModule } from '../task-category-activity/task-category-activity.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('taskCategory'),
    TaskCategoryModule,
    CredentialModule,
    TaskCategoryActivityModule
  ],
  providers: [TaskCategoryResolver, TaskCategoryService],
})
export class TaskCategoryModule {}
