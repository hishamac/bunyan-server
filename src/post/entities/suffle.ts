import { Field, ObjectType } from "@nestjs/graphql";
import { Event } from "src/event/entities/event.entity";
import { Job } from "src/job/entities/job.entity";
import { Post } from "./post.entity";

@ObjectType()
export class ContentResponse {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Event], { nullable: true })
  events?: Event[];

  @Field(() => [Job], { nullable:  true })
  jobs?: Job[];
}