import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => Int)
  mahalluId: number;

  @Field()
  date: Date;

  @Field(() => Float)
  amount: number;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field()
  paidBy: string;

  @Field(() => Int)
  accountId: number;
}
