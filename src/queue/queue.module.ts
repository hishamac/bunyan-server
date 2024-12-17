import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { QueueSchedulerService } from './queue.scheduler';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [QueueService, QueueProcessor, QueueSchedulerService],
  exports: [QueueService , QueueProcessor , QueueSchedulerService], // Export QueueService for usage in other modules
})
export class QueueModule {}