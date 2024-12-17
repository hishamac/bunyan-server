import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Badge } from '../../badge/entities/badge.entity';
import { CampaignActivity } from '../../campaign-activity/entities/campaign-activity.entity';
import { Task } from '../../task/entities/task.entity';
import { Year } from '../../year/entities/year.entity';

@ObjectType()
export class Campaign {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field((type) => [Task], { nullable: true })
  tasks?: Task[];

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;

  @Field(() => Int, { nullable: true })
  badgeId?: number;

  @Field(() => Badge, { nullable: true })
  badge?: Badge;

  @Field(() => Int, { nullable: true })
  yearId?: number;

  @Field(() => Year, { nullable: true })
  year?: Year;

  @Field(() => [CampaignActivity], { nullable: true })
  activities?: CampaignActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
