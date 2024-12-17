import { CreateCommitteeActivityInput } from './create-committee-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommitteeActivityInput extends PartialType(CreateCommitteeActivityInput) {
  @Field(() => Int)
  id: number;
}
