import { Module } from '@nestjs/common';
import { TaskCategoryActivityService } from './task-category-activity.service';
import { TaskCategoryActivityResolver } from './task-category-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('taskActivity')],
  providers: [TaskCategoryActivityResolver, TaskCategoryActivityService],
  exports: [TaskCategoryActivityService],
})
export class TaskCategoryActivityModule {}