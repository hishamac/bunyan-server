import { CreateMahalluActivityInput } from './create-mahallu-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMahalluActivityInput extends PartialType(CreateMahalluActivityInput) {
  @Field(() => Int)
  id: number;
}
