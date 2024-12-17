import { Module } from '@nestjs/common';
import { CommitteeService } from './committee.service';
import { CommitteeResolver } from './committee.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CommitteeActivityModule } from '../committee-activity/committee-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('committee'),
    CommitteeActivityModule,
    CredentialModule,
  ],
  providers: [CommitteeResolver, CommitteeService],
})
export class CommitteeModule {}
