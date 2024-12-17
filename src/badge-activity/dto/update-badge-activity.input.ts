import { CreateBadgeActivityInput } from './create-badge-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBadgeActivityInput extends PartialType(CreateBadgeActivityInput) {
  @Field(() => Int)
  id: number;
}
