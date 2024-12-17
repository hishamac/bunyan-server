import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommitteeInput {
  @Field(() => Int)
  memberId: number;

  @Field()
  position: string;

  @Field(() => Int)
  mahalluId: number;
}
