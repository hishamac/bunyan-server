import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  fileURL: string;

  @Field(() => Int)
  mahalluId: number;

  @Field(() => Boolean, { defaultValue: true })
  active: boolean;

  @Field(() => Int, { nullable: true })
  createdById: number;
}
