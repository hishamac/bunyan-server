import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { MemberActivityModule } from '../member-activity/member-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('member'),
    MemberActivityModule,
    CredentialModule,
  ],
  providers: [MemberResolver, MemberService],
})
export class MemberModule {}
