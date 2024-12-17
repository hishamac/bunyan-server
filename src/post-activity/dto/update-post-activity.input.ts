import { CreatePostActivityInput } from './create-post-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdatePostActivityInput extends PartialType(CreatePostActivityInput) {
  @Field(() => Int)
  id: number;
}
