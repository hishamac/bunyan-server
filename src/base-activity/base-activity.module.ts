import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseActivityService } from './base-activity.service';
import { RedisService } from '../redis/redis.service';

@Module({})
export class BaseActivityModule {
  static forFeature(modelName: string): DynamicModule {
    return {
      module: BaseActivityModule,
      providers: [
        PrismaService,
        {
          provide: BaseActivityService,
          useFactory: (prisma: PrismaService , redis : RedisService) => {
            return new BaseActivityService(prisma, modelName , redis);
          },
          inject: [PrismaService],
        },
      ],
      exports: [BaseActivityService],
    };
  }
}
