import { CreateNotificationActivityInput } from './create-notification-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationActivityInput extends PartialType(CreateNotificationActivityInput) {
  @Field(() => Int)
  id: number;
}
