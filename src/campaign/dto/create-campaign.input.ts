import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCampaignInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ defaultValue: true })
  active: boolean;

  @Field(() => Int)
  yearId: number;

  @Field(() => Int)
  badgeId: number;
}
