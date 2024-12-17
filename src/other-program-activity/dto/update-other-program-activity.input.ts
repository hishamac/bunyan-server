import { CreateOtherProgramActivityInput } from './create-other-program-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOtherProgramActivityInput extends PartialType(CreateOtherProgramActivityInput) {
  @Field(() => Int)
  id: number;
}
