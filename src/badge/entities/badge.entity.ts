import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BadgeActivity } from '../../badge-activity/entities/badge-activity.entity';
import { Year } from '../../year/entities/year.entity';

@ObjectType()
export class Badge {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => Int, { nullable: true })
  yearId?: number;

  @Field(() => Year, { nullable: true })
  year?: Year;

  @Field(() => [BadgeActivity], { nullable: true })
  activities?: BadgeActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
