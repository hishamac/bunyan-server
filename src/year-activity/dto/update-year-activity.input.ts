import { CreateYearActivityInput } from './create-year-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateYearActivityInput extends PartialType(CreateYearActivityInput) {
  @Field(() => Int)
  id: number;
}
