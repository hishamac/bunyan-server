import { CreatePostInteractionInput } from './create-post-interaction.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdatePostInteractionInput extends PartialType(CreatePostInteractionInput) {
  @Field(() => Int)
  id: number;
}
