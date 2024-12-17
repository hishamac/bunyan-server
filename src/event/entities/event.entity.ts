import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EventActivity } from '../../event-activity/entities/event-activity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Event {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  posterURL?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true, nullable: true })
  online?: boolean;

  @Field({ nullable: true })
  location?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ defaultValue: true, nullable: true })
  admin?: boolean;

  @Field({ nullable: true })
  startingDate?: Date; // Can be a custom date scalar if preferred

  @Field({ nullable: true })
  endingDate?: Date; // Can be a custom date scalar if preferred

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  verified?: boolean;

  @Field(() => [EventActivity], { nullable: true })
  activities?: EventActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
