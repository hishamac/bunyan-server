import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';
import { AccountActivityModule } from '../account-activity/account-activity.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('account'),
    AccountActivityModule,
    CredentialModule,
  ],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
