import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { Credential, Post, Prisma } from '@prisma/client';
import { UpdatePostInput } from './dto/update-post.input';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { PostActivityService } from '../post-activity/post-activity.service';
import { ValidationRule } from 'src/utils/types';
import { ContentResponse } from './entities/suffle';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    postActivityService: PostActivityService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'post',
      postActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (user) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }
    return super.count(authorizedFilter, relationsToFilter);
  }

  async create(
    createPostInput: CreatePostInput,
    validationRule: any,
    user: Credential,
  ): Promise<Post> {
    const data = {
      ...createPostInput,
      // createdById: user.id,
    };

    !data.createdById && (data.createdById = user.id);

    // user
    user.id = data.createdById;

    return super.create(data, validationRule, user);
  }

  async update(
    id: number,
    updatePostInput: UpdatePostInput,
    validationRule: any,
    user: Credential,
  ): Promise<Post> {
    // check if the user is authorized to update the post
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!post) {
      throw new Error('You are not authorized to update this post');
    }

    return super.update(id, updatePostInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Post> {
    // check if the user is authorized to delete the post
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
        createdById: user.id,
      },
    });

    if (!post) {
      throw new Error('You are not authorized to delete this post');
    }

    return super.remove(id, user);
  }

  // async createMany(
  //   data: any[],
  //   validationRules: ValidationRule[],
  //   actor?: Credential,
  // ): Promise<any[]> {
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
    const posts = await this.prisma.post.findMany({
      where: {
        id: {
          in: ids,
        },
        createdById: actor?.id,
      },
    });

    if (posts.length !== ids.length) {
      throw new Error('You are not authorized to delete some of the posts');
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
  ): Promise<any[]> {
    // add filter for createdById
    let authorizedFilter = filters;

    // also check if filters already have mahalluId
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
  ): Promise<any> {
    if (user) {
      const post = await this.prisma.post.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!post) {
        throw new Error('You are not authorized to view this post');
      }
    }

    return super.findOne(id, field, relationsToInclude);
  }

  async getPersonalizedFeed(
    recentlyViewed: { postIds: number[]; jobIds: number[]; eventIds: number[] },
    limit = 10,
  ) {
    // Fetch new (unseen) content
    const newPosts = await this.prisma.post.findMany({
      where: {
        AND: [
          { id: { notIn: recentlyViewed.postIds } }, // Exclude recently viewed
          { active: true },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: Math.ceil(limit * 0.8), // 80% unseen content
    });

    const newJobs = await this.prisma.job.findMany({
      where: {
        AND: [{ id: { notIn: recentlyViewed.jobIds } }, { active: true }],
      },
      orderBy: { postedDate: 'desc' },
      take: Math.ceil(limit * 0.8),
    });

    const newEvents = await this.prisma.event.findMany({
      where: {
        AND: [{ id: { notIn: recentlyViewed.eventIds } }, { active: true }],
      },
      orderBy: { startingDate: 'desc' },
      take: Math.ceil(limit * 0.8),
    });

    // Fetch older (recently viewed) content for mix
    const olderPosts = await this.prisma.post.findMany({
      where: {
        AND: [
          { id: { in: recentlyViewed.postIds } }, // Include viewed content
          { active: true },
        ],
      },
      orderBy: { updatedAt: 'desc' },
      take: Math.ceil(limit * 0.2), // 20% older content
    });

    const olderJobs = await this.prisma.job.findMany({
      where: {
        AND: [{ id: { in: recentlyViewed.jobIds } }, { active: true }],
      },
      orderBy: { updatedAt: 'desc' },
      take: Math.ceil(limit * 0.2),
    });

    const olderEvents = await this.prisma.event.findMany({
      where: {
        AND: [{ id: { in: recentlyViewed.eventIds } }, { active: true }],
      },
      orderBy: { updatedAt: 'desc' },
      take: Math.ceil(limit * 0.2),
    });

    // Combine and shuffle feed
    const feed = this.shuffleFeed([
      ...newPosts,
      ...newJobs,
      ...newEvents,
      ...olderPosts,
      ...olderJobs,
      ...olderEvents,
    ]);

    return feed;
  }

  private shuffleFeed(feed: any[]): any[] {
    return feed.sort(() => Math.random() - 0.5); // Simple shuffle logic
  }

  async getShuffledContent(options: {
    postLimit?: number;
    eventLimit?: number;
    jobLimit?: number;
  }) {
    const { postLimit = 10, eventLimit = 10, jobLimit = 10 } = options;
  
    // Fetch all active content IDs (shuffled in DB)
    const [postIds, eventIds, jobIds] = await Promise.all([
      this.getShuffledIds('post'),
      this.getShuffledIds('event'),
      this.getShuffledIds('job'),
    ]);
  
    // Fetch posts by shuffled IDs
    const posts = postIds.length
      ? await this.prisma.post.findMany({
          where: { id: { in: postIds.slice(0, postLimit) }, active: true },
          include: { mahallu: true, createdBy: true },
        })
      : [];
  
    // Sort posts to preserve shuffled order
    const sortedPosts = this.sortByIds(posts, postIds);
  
    // Fetch events by shuffled IDs
    const events = eventIds.length
      ? await this.prisma.event.findMany({
          where: { id: { in: eventIds.slice(0, eventLimit) }, active: true, startingDate: { gte: new Date() } },
          include: { mahallu: true, createdBy: true },
        })
      : [];
  
    // Sort events to preserve shuffled order
    const sortedEvents = this.sortByIds(events, eventIds);
  
    // Fetch jobs by shuffled IDs
    const jobs = jobIds.length
      ? await this.prisma.job.findMany({
          where: { id: { in: jobIds.slice(0, jobLimit) }, active: true, expirationDate: { gte: new Date() } },
          include: { mahallu: true, createdBy: true },
        })
      : [];
  
    // Sort jobs to preserve shuffled order
    const sortedJobs = this.sortByIds(jobs, jobIds);
  
    return { posts: sortedPosts, events: sortedEvents, jobs: sortedJobs };
  }
  
  /**
   * Sort fetched items based on the order of IDs
   */
  private sortByIds<T extends { id: number }>(items: T[], ids: number[]): T[] {
    const idToItemMap = new Map(items.map((item) => [item.id, item]));
    return ids.map((id) => idToItemMap.get(id)).filter((item): item is T => !!item);
  }

  private async getShuffledIds(type: 'post' | 'event' | 'job'): Promise<number[]> {
    let tableName: string;

    // Map content type to table name
    switch (type) {
      case 'post':
        tableName = 'Post';
        break;
      case 'event':
        tableName = 'Event';
        break;
      case 'job':
        tableName = 'Job';
        break;
      default:
        throw new Error('Invalid content type');
    }

    // Use raw SQL to randomize results
    const result = await this.prisma.$queryRaw<{ id: number }[]>(
      Prisma.sql`SELECT id FROM ${Prisma.raw(`"${tableName}"`)} 
                 WHERE active = true 
                 ORDER BY RANDOM()`
    );
  
    console.log(`Shuffled IDs for ${type}:`, result.map((item) => item.id));
  
  

    return result.map((item) => item.id);
  }

}
