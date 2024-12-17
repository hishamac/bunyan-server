import { Module } from '@nestjs/common';
import { CharityService } from './charity.service';
import { CharityResolver } from './charity.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CharityActivityModule } from '../charity-activity/charity-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('charity'),
    CharityActivityModule,
    CredentialModule,
  ],
  providers: [CharityResolver, CharityService],
})
export class CharityModule {}
