import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseResolver } from './expense.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('expense'),
    CredentialModule,
  ],
  providers: [ExpenseResolver, ExpenseService],
})
export class ExpenseModule {}
