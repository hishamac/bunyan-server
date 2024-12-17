import { CreateMemberActivityInput } from './create-member-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateMemberActivityInput extends PartialType(CreateMemberActivityInput) {
  @Field(() => Int)
  id: number;
}
