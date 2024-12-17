import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyResolver } from './family.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { FamilyActivityModule } from '../family-activity/family-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('family'),
    FamilyActivityModule,
    CredentialModule,
  ],
  providers: [FamilyResolver, FamilyService],
})
export class FamilyModule {}
