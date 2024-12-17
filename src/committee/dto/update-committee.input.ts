import { CreateCommitteeInput } from './create-committee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommitteeInput extends PartialType(CreateCommitteeInput) {
  @Field(() => Int)
  id: number;
}
