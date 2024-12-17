import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [RedisModule, PrismaModule, BaseModule.forFeature('category'),CredentialModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
