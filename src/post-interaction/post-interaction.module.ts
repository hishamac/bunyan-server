import { Module } from '@nestjs/common';
import { PostInteractionService } from './post-interaction.service';
import { PostInteractionResolver } from './post-interaction.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('postInteraction'),
    CredentialModule,
  ],
  providers: [PostInteractionResolver, PostInteractionService],
})
export class PostInteractionModule {}
