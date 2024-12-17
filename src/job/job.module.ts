import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { JobActivityModule } from '../job-activity/job-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('job'),
    JobActivityModule,
    CredentialModule,
  ],
  providers: [JobResolver, JobService],
})
export class JobModule {}
