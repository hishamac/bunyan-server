import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneResolver } from './zone.resolver';
import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { ZoneActivityModule } from '../zone-activity/zone-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('zone'),
    ZoneActivityModule,
    CredentialModule,
  ],
  providers: [ZoneResolver, ZoneService],
})
export class ZoneModule {}
