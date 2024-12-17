import { CreateCharityActivityInput } from './create-charity-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateCharityActivityInput extends PartialType(CreateCharityActivityInput) {
  @Field(() => Int)
  id: number;
}
