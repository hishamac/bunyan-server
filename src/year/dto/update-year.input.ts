import { CreateYearInput } from './create-year.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateYearInput extends PartialType(CreateYearInput) {
  @Field(() => Int)
  id: number;
}
