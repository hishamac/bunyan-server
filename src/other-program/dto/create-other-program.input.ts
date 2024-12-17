import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOtherProgramInput {
  @Field(() => [String])
  files: string[];

  @Field(() => Int)
  categoryId: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  mahalluId: number;
}
