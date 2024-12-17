import { Module } from '@nestjs/common';
import { JobActivityService } from './job-activity.service';
import { JobActivityResolver } from './job-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('jobActivity')],
  providers: [JobActivityResolver, JobActivityService],
  exports: [JobActivityService],
})
export class JobActivityModule {}