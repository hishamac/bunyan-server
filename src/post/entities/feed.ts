import { InputType, Int, Field, ObjectType, Union } from '@nestjs/graphql';
import { RecentlyViewedInput } from '../dto/recently';
import { Job } from 'src/job/entities/job.entity';
import { Event } from 'src/event/entities/event.entity';
import { Post } from './post.entity';

@InputType()
export class FeedQueryInput {
  @Field(() => Int)
  mahalluId: number;

  @Field(() => RecentlyViewedInput)
  recentlyViewed: RecentlyViewedInput;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit: number;
}

@ObjectType()
export class FeedResponse {
  @Field(() => [FeedItem])
  items: FeedItem[];

  @Field(() => Int)
  total: number;
}


@ObjectType({ description: 'Feed item union type' })
export class FeedItem {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Job, { nullable: true })
  job?: Job;

  @Field(() => Event, { nullable: true })
  event?: Event;
}