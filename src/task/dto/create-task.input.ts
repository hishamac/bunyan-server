import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '../../enums/status';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int, { nullable: true })
  badgeId?: number;

  @Field({ defaultValue: true })
  active: boolean;

  @Field(() => Int, { nullable: true })
  campaignId?: number;

  @Field(() => Int)
  yearId: number;

  @Field(() => Int)
  points: number;

  @Field()
  startDate: Date;

  @Field()
  dueDate: Date;
}
