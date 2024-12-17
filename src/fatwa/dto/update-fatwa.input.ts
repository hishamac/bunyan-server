import { CreateFatwaInput } from './create-fatwa.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFatwaInput extends PartialType(CreateFatwaInput) {
  @Field(() => Int)
  id: number;
}
