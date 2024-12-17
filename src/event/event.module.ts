import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { EventActivityModule } from '../event-activity/event-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('event'),
    EventActivityModule,
    CredentialModule,
  ],
  providers: [EventResolver, EventService],
})
export class EventModule {}
