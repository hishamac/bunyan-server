import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RecentlyViewedInput {
  @Field(() => [Int], { defaultValue: [] })
  postIds: number[];

  @Field(() => [Int], { defaultValue: [] })
  jobIds: number[];

  @Field(() => [Int], { defaultValue: [] })
  eventIds: number[];
}
