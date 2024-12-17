import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationResolver } from './donation.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { DonationActivityModule } from '../donation-activity/donation-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('donation'),
    DonationActivityModule,
    CredentialModule,
  ],
  providers: [DonationResolver, DonationService],
})
export class DonationModule {}
