import { CreateZoneActivityInput } from './create-zone-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateZoneActivityInput extends PartialType(CreateZoneActivityInput) {
  @Field(() => Int)
  id: number;
}
