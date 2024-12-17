import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field()
  name: string;

  @Field(() => Int)
  mahalluId: number;

  @Field(() => Float, { defaultValue: 0 })
  balance: number;
}
