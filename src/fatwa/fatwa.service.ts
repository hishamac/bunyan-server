import { Injectable } from '@nestjs/common';
import { $Enums, Credential, Fatwa, RoleEnum } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
// import { FatwaActivityService } from '../fatwa-activity/fatwa-activity.service';
import { ValidationRule } from 'src/utils/types';

@Injectable()
export class FatwaService extends BaseService<Fatwa> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    // fatwaActivityService: FatwaActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'fatwa',
      // fatwaActivityService,
    );
  }

  async answerFatwa(fatwaId: number, answer: string, user: Credential) {
    // Validate user has permission to answer fatwa
    if (!user || !user.role || user.role !== RoleEnum.INFO_ADMIN) {
      throw new Error('Unauthorized: User must be a scholar to answer a fatwa');
    }

    // check if the fatwa exists
    const fatwa = await this.findOne(fatwaId);
    if (!fatwa) {
      throw new Error('Fatwa not found');
    }

    // Send WhatsApp message
    try {
      const data = JSON.stringify({
        recipientPhoneNo: '916238964074', // Assuming you have the user's phone number in the fatwa object
        name: 'hello_world',
        languageCode: 'en_US',
      });

      const response = await fetch(
        'https://whatsapp-webhook-eight-phi.vercel.app/send-template-message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('WhatsApp message sent:', JSON.stringify(responseData));
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      // Optionally, you might want to handle this error differently
      // For now, we'll continue with updating the fatwa even if message sending fails
    }

    this.redis.deleteByPattern('fatwa*');

    // Update the fatwa with the answer
    return this.prisma.fatwa.update({
      where: { id: fatwaId },
      data: {
        status: 'ANSWERED',
        answer,
        answeredById: user.id,
        answeredAt: new Date(),
      },
      include: {
        answeredBy: true,
      },
    });
  }

  async createMany(
    data: any[],
    validationRules: ValidationRule[],
    actor?: Credential,
  ): Promise<
    {
      id: number;
      question: string;
      questionerMobile: string;
      askedAt: Date;
      answer: string | null;
      answeredById: number | null;
      answeredAt: Date | null;
      status: $Enums.FatwaStatus;
      createdAt: Date;
    }[]
  > {
    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules);
      districts.push(dt);
    }

    return districts;
  }
}
