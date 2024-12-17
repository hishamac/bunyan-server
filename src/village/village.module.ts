import { Module } from '@nestjs/common';
import { VillageService } from './village.service';
import { VillageResolver } from './village.resolver';
import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { VillageActivityModule } from '../village-activity/village-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('village'),
    VillageActivityModule,
    CredentialModule,
  ],
  providers: [VillageResolver, VillageService],
})
export class VillageModule {}
