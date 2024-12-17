import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeResolver } from './badge.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { QueueModule } from '../queue/queue.module';
import { BadgeActivityModule } from '../badge-activity/badge-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('badge'),
    BadgeActivityModule,
    CredentialModule,
  ],
  providers: [BadgeResolver, BadgeService],
})
export class BadgeModule {}
