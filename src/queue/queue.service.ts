import { Injectable, Inject } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class QueueService {
  private queues: Map<string, Queue> = new Map(); // Stores queues dynamically
  private readonly TTL = 60 * 60 * 24; // TTL in seconds (24 hours)

  constructor(private readonly redisService: RedisService) {}

  private get redisClient(): Redis {
    return this.redisService.getClient();
  }

  // Create or retrieve a queue dynamically
  getOrCreateQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, {
        connection: this.redisClient,
      });

      this.queues.set(queueName, queue);
      this.setQueueTTL(queueName); // Set TTL on queue creation
    }

    return this.queues.get(queueName)!;
  }

  // Enqueue a job
  async enqueueJob(queueName: string, data: any) {
    const queue = this.getOrCreateQueue(queueName);
    await queue.add('job', data);
    this.setQueueTTL(queueName); // Refresh TTL on activity
  }

  // Set a TTL key for the queue
  private setQueueTTL(queueName: string) {
    const key = `QUEUE:${queueName}:ttl`;
    this.redisClient.set(key, 'active', 'EX', this.TTL);
  }

  // Cleanup expired queues
  async cleanupQueues() {
    const keys = await this.redisClient.keys('QUEUE:*:ttl');
    for (const key of keys) {
      const isActive = await this.redisClient.get(key);
      if (!isActive) {
        const queueName = key.split(':')[1];
        const queue = this.queues.get(queueName);
        if (queue) {
          await queue.close(); // Gracefully close the queue
          this.queues.delete(queueName);
          console.log(`Cleaned up queue: ${queueName}`);
        }
      }
    }
  }
}
