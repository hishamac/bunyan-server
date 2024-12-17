import { CreateFamilyInput } from './create-family.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateFamilyInput extends PartialType(CreateFamilyInput) {
  @Field(() => Int)
  id: number;
}
