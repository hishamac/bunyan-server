import { CreateAccountActivityInput } from './create-account-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountActivityInput extends PartialType(CreateAccountActivityInput) {
  @Field(() => Int)
  id: number;
}
