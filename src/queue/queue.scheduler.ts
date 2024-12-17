import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QueueService } from './queue.service';

@Injectable()
export class QueueSchedulerService {
  constructor(private readonly queueService: QueueService) {}

  @Cron('0 * * * *') // Runs every hour
  async handleQueueCleanup() {
    console.log('Running queue cleanup...');
    await this.queueService.cleanupQueues();
  }
}
