import { CreateMahalluInput } from './create-mahallu.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMahalluInput extends PartialType(CreateMahalluInput) {
  @Field(() => Int)
  id: number;
}
