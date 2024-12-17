import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from './base.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueModule } from '../queue/queue.module';
import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueService } from '../queue/queue.service';

@Module({})
export class BaseModule {
  static forFeature(modelName: string): DynamicModule {
    return {
      module: BaseModule,
      providers: [
        PrismaService,
        RedisService,
        QueueProcessor,
        {
          provide: BaseService,
          useFactory: (
            prisma: PrismaService,
            redis: RedisService,
            queueProcessor: QueueProcessor,
            queueService: QueueService,
          ) => {
            return new BaseService(
              prisma,
              redis,
              queueProcessor,
              queueService,
              modelName,
            );
          },
          inject: [PrismaService],
        },
      ],
      exports: [BaseService],
      // imports: [QueueModule , RedisModule , PrismaModule],
    };
  }
}
