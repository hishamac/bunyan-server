import { Injectable } from '@nestjs/common';
import { CreatePostInteractionInput } from './dto/create-post-interaction.input';
import { UpdatePostInteractionInput } from './dto/update-post-interaction.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { PostInteraction } from '@prisma/client';

@Injectable()
export class PostInteractionService extends BaseService<PostInteraction> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
  ) {
    super(prisma, redis, queueProcessor, queueService, 'postInteraction');
  }
}
