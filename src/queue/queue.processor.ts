import { Injectable } from '@nestjs/common';
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class QueueProcessor {
  constructor(private readonly redisService: RedisService) {}

  private get redisClient(): Redis {
    return this.redisService.getClient();
  }

  // Dynamically attach a worker to process jobs in a queue
  attachWorker(queueName: string, processor: (job: any) => Promise<void>) {
    new Worker(
      queueName,
      async (job) => {
        console.log(`Processing job in ${queueName}:`, job.data);
        await processor(job.data);
      },
      { connection: this.redisClient },
    );
  }
}
