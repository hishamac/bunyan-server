import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YearTypeEnum } from '../../enums/yearType';
import { Badge } from '../../badge/entities/badge.entity';
import { Campaign } from '../../campaign/entities/campaign.entity';
import { Task } from '../../task/entities/task.entity';
import { YearActivity } from '../../year-activity/entities/year-activity.entity';

@ObjectType()
export class Year {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => YearTypeEnum, { nullable: true })
  type?: YearTypeEnum;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field(() => [Campaign], { nullable: true })
  campaigns?: Campaign[];

  @Field(() => [Badge], { nullable: true })
  badges?: Badge[];

  @Field(() => [YearActivity], { nullable: true })
  activities?: YearActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
