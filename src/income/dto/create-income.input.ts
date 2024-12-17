import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateIncomeInput {
  @Field()
  date: Date;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  mahalluId: number;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field()
  receivedBy: string;

  @Field(() => Int)
  accountId: number;
}
