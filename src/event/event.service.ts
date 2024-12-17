import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { Credential, Event } from '@prisma/client';
import { UpdateEventInput } from './dto/update-event.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { EventActivityService } from '../event-activity/event-activity.service';
import { ValidationRule, ValidationType } from 'src/utils/types';

@Injectable()
export class EventService extends BaseService<Event> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    eventActivityService: EventActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'event',
      eventActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (filters && !filters.mahalluId && user) {
      authorizedFilter = {
      ...filters,
      createdById: user.id,
    };
  }
    return super.count(authorizedFilter, relationsToFilter);
  }

  async create(
    createEventInput: CreateEventInput,
    validationRule: any,
    user: Credential,
  ): Promise<Event> {
    const data = {
      ...createEventInput,
      // createdById: user.id,
    };

    !data.createdById && (data.createdById = user.id);

    // user
    user.id = data.createdById;

    return super.create(data, validationRule, user);
  }

  async update(
    id: number,
    updateEventInput: UpdateEventInput,
    validationRule: any,
    user: Credential,
  ): Promise<Event> {
    // check if the user is authorized to update the event
    const event = await this.prisma.event.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!event) {
      throw new Error('You are not authorized to update this event');
    }

    return super.update(id, updateEventInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Event> {
    // check if the user is authorized to delete the event
    const event = await this.prisma.event.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!event) {
      throw new Error('You are not authorized to delete this event');
    }

    return super.remove(id, user);
  }

  // async createMany(
  //   data: any[],
  //   validationRules: ValidationRule[],
  //   actor?: Credential,
  // ): Promise<
  //   {
  //     id: number;
  //     posterURL: string;
  //     title: string;
  //     description: string;
  //     online: boolean;
  //     location: string | null;
  //     mahalluId: number | null;
  //     admin: boolean;
  //     startingDate: Date;
  //     endingDate: Date;
  //     active: boolean;
  //     remarks: string | null;
  //     verified: boolean;
  //     createdById: number | null;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   }[]
  // > {
  //   const dataWithActor = data.map((d) => ({
  //     ...d,
  //     createdById: actor?.id,
  //   }));

  //   return super.createMany(dataWithActor, validationRules, actor);
  // }

  async createMany(data: any[], validationRules: any, user?: Credential) {

    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules, user);
      districts.push(dt);
    }

    return districts;
  }

  async removeMany(ids: number[], actor?: Credential): Promise<void> {
    const events = await this.prisma.event.findMany({
      where: {
        id: {
          in: ids,
        },
        createdById: actor?.id,
      },
    });

    if (events.length !== ids.length) {
      throw new Error('You are not authorized to delete some of the events');
    }

    return super.removeMany(ids, actor);
  }

  async findAll(
    limit?: number,
    offset?: number,
    filters?: { [key: string]: any },
    sort?: { field: string; direction: 'asc' | 'desc' },
    relationsToFilter?: { [key: string]: any },
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<
    {
      id: number;
      posterURL: string;
      title: string;
      description: string;
      online: boolean;
      location: string | null;
      mahalluId: number | null;
      admin: boolean;
      startingDate: Date;
      endingDate: Date;
      active: boolean;
      remarks: string | null;
      verified: boolean;
      createdById: number | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    // add filter for createdById
    let authorizedFilter = filters;
    
    if (filters && !filters.mahalluId && user) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }
    console.log('filters', filters);

    return super.findAll(
      limit,
      offset,
      authorizedFilter,
      sort,
      relationsToFilter,
      relationsToInclude,
    );
  }

  async findOne(
    id: number,
    field?: string,
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<{
    id: number;
    posterURL: string;
    title: string;
    description: string;
    online: boolean;
    location: string | null;
    mahalluId: number | null;
    admin: boolean;
    startingDate: Date;
    endingDate: Date;
    active: boolean;
    remarks: string | null;
    verified: boolean;
    createdById: number | null;
    createdAt: Date;
    updatedAt: Date;
  }> {
    if (user) {
      const event = await this.prisma.event.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!event) {
        throw new Error('You are not authorized to view this event');
      }
    }

    return super.findOne(id, field, relationsToInclude);
  }
}
