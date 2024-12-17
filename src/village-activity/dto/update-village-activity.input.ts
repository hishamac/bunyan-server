import { CreateVillageActivityInput } from './create-village-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVillageActivityInput extends PartialType(CreateVillageActivityInput) {
  @Field(() => Int)
  id: number;
}
