import { CreateCampaignActivityInput } from './create-campaign-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCampaignActivityInput extends PartialType(CreateCampaignActivityInput) {
  @Field(() => Int)
  id: number;
}
