import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Credential, Notification, RoleEnum } from '@prisma/client';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { NotificationActivityService } from '../notification-activity/notification-activity.service';
import { log } from 'node:console';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    notificationActivityService: NotificationActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'notification',
      notificationActivityService,
    );
  }

  async updateViewedBy(id: number, user: Credential): Promise<Notification> {
    const viewedBy = {
      id: user.id,
    };
    return await this.prisma.notification.update({
      where: { id },
      data: {
        viewedBy: {
          push: viewedBy,
        },
      },
    });
  }

  async findMyNotifications(
    user: Credential,
    skip: number = 0,
    take: number = 10,
  ): Promise<Notification[]> {
    const userId = user?.id; // User ID from the authenticated user

    let notifications = [];

    notifications = await this.prisma.notification.findMany({
      where: {
        credentials: {
          some: {
            id: userId,
          },
        },
      },
      skip,
      take,
      include: {
        credentials: true,
        createdBy: true,
      },
    });
    // Handle null cases for `viewedBy`
    notifications = notifications.map((notification) => ({
      ...notification,
      viewedBy: notification.viewedBy?.some((view) => view.id === userId)
        ? notification.viewedBy
        : null,
    }));

    // console.log(notifications);

    return notifications;
  }

  async getMySentNotifications(
    user: Credential,
    skip: number,
    take: number,
  ): Promise<Notification[]> {
    const userId = user.id; // User ID from the authenticated user
    return await this.prisma.notification.findMany({
      where: {
        createdById: userId,
      },
      skip,
      take,
      include: {
        credentials: true,
        createdBy: true,
      },
    });
  }

  async create(
    createNotificationInput: any,
    validationRules: any,
    user: Credential,
  ): Promise<Notification> {
    const data = {
      ...createNotificationInput,
      createdById: user.id,
    };

    // check all the credentials are valid

    const credentialsIds = createNotificationInput.credentials;

    const credentials = await this.prisma.credential.findMany({
      where: {
        id: {
          in: credentialsIds,
        },
      },
    });

    if (credentials.length !== credentialsIds.length) {
      throw new Error('Invalid credentials');
    }

    // connect the credentials to the notification
    data.credentials = {
      connect: credentials.map((credential) => ({
        id: credential.id,
      })),
    };

    return super.create(data, validationRules, user);
  }
}
