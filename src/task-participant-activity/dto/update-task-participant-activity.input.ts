import { CreateTaskParticipantActivityInput } from './create-task-participant-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskParticipantActivityInput extends PartialType(CreateTaskParticipantActivityInput) {
  @Field(() => Int)
  id: number;
}
