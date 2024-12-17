import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeResolver } from './income.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('income'),
    CredentialModule,
  ],
  providers: [IncomeResolver, IncomeService],
})
export class IncomeModule {}
