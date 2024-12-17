import { Module } from '@nestjs/common';
import { YearService } from './year.service';
import { YearResolver } from './year.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { YearActivityModule } from '../year-activity/year-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('year'),
    YearActivityModule,
    CredentialModule,
  ],
  providers: [YearResolver, YearService],
})
export class YearModule {}
