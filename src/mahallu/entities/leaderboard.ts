import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Badge } from "src/badge/entities/badge.entity";
import { MahalluActivityCounts } from "./activities.count";

@ObjectType()
export class MahalluLeaderboardEntry {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  regNo: string;

  @Field()
  place: string;

  @Field(() => Int)
  totalPoints: number;

  @Field(() => MahalluActivityCounts)
  counts: MahalluActivityCounts;

  @Field(() => Int)
  badgesCount: number;

  @Field(() => [Badge])
  badges: Badge[];
}