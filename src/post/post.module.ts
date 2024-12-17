import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { PostActivityModule } from '../post-activity/post-activity.module';
import { CredentialModule } from '../credential/credential.module';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('post'),
    PostActivityModule,
    CredentialModule,
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {}
