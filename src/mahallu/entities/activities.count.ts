import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MahalluActivityCounts {
  @Field(() => Int)
  taskParticipants: number;

  @Field(() => Int)
  otherPrograms: number;

  @Field(() => Int)
  posts: number;

  @Field(() => Int)
  events: number;

  @Field(() => Int)
  jobs: number;
}