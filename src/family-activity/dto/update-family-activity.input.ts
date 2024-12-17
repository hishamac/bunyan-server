import { CreateFamilyActivityInput } from './create-family-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateFamilyActivityInput extends PartialType(CreateFamilyActivityInput) {
  @Field(() => Int)
  id: number;
}
