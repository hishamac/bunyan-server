import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictResolver } from './district.resolver';
import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { QueueModule } from '../queue/queue.module';
import { DistrictActivityModule } from '../district-activity/district-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('district'),
    QueueModule,
    DistrictActivityModule,
    CredentialModule,
  ],
  providers: [DistrictResolver, DistrictService],
})
export class DistrictModule {}
