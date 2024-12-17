import { CreateDonationActivityInput } from './create-donation-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDonationActivityInput extends PartialType(CreateDonationActivityInput) {
  @Field(() => Int)
  id: number;
}
