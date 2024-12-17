import { CreateDistrictActivityInput } from './create-district-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDistrictActivityInput extends PartialType(CreateDistrictActivityInput) {
  @Field(() => Int)
  id: number;
}
