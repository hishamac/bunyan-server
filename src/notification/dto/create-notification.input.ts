import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ defaultValue: true })
  active: boolean;

  @Field(() => [Int] , { nullable: true })
  credentials?: number[];
}
