import { CreateOtherProgramInput } from './create-other-program.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOtherProgramInput extends PartialType(CreateOtherProgramInput) {
  @Field(() => Int)
  id: number;
}
