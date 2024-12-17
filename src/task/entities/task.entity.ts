import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Status } from '../../enums/status';
import { Campaign } from '../../campaign/entities/campaign.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { TaskActivity } from '../../task-activity/entities/task-activity.entity';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskParticipant } from '../../task-participant/entities/task-participant.entity';
import { Year } from '../../year/entities/year.entity';
import { Badge } from '../../badge/entities/badge.entity';

@ObjectType()
export class Task {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  categoryId?: number; // Foreign key to task_category

  @Field((type) => TaskCategory, { nullable: true })
  category?: TaskCategory;

  @Field(() => Int, { nullable: true })
  badgeId?: number;

  @Field(() => Badge, { nullable: true })
  badge?: Badge;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;

  @Field((type) => Int, { nullable: true })
  campaignId?: number; // Foreign key to campaign

  @Field((type) => Campaign, { nullable: true })
  campaign?: Campaign;

  @Field((type) => Int, { nullable: true })
  yearId?: number;

  @Field((type) => Year, { nullable: true })
  year?: Year;

  @Field({ defaultValue: false, nullable: true })
  verified?: boolean;

  @Field((type) => Int, { nullable: true })
  points?: number;

  @Field((type) => [TaskParticipant], { nullable: true })
  participants?: TaskParticipant[];

  @Field((type) => [TaskActivity], { nullable: true })
  activities?: TaskActivity[];

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
