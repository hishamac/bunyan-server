import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RankingDetails {
  @Field(() => Int)
  rank: number;

  @Field(() => Int)
  totalEntities: number;

  @Field(() => Float)
  percentile: number;

  @Field(() => Int)
  entityId: number;

  @Field(() => String)
  entityName: string;
}

@ObjectType()
export class MahalluRankingDetails {
  @Field(() => RankingDetails)
  overallRanking: RankingDetails;

  @Field(() => RankingDetails, { nullable: true })
  villageRanking?: RankingDetails;

  @Field(() => RankingDetails, { nullable: true })
  zoneRanking?: RankingDetails;

  @Field(() => RankingDetails, { nullable: true })
  districtRanking?: RankingDetails;
}
