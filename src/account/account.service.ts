import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from '@prisma/client';
import { UpdateAccountInput } from './dto/update-account.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { AccountActivityService } from '../account-activity/account-activity.service';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    accountActivityService: AccountActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'account',
      accountActivityService,
    );
  }
}
