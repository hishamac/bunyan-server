import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { NotificationActivityModule } from '../notification-activity/notification-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('notification'),
    NotificationActivityModule,
    CredentialModule,
  ],
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
