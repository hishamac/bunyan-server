import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInteractionInput {
  @Field(() => Int)
  postId: number;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Boolean)
  guest: boolean;
}
