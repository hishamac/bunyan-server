import { Module } from '@nestjs/common';
import { MahalluService } from './mahallu.service';
import { MahalluResolver } from './mahallu.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { MahalluActivityModule } from '../mahallu-activity/mahallu-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('mahallu'),
    MahalluActivityModule,
    CredentialModule,
  ],
  providers: [MahalluResolver, MahalluService],
})
export class MahalluModule {}
