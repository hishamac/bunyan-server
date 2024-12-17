import { CreateEventActivityInput } from './create-event-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventActivityInput extends PartialType(CreateEventActivityInput) {
  @Field(() => Int)
  id: number;
}
