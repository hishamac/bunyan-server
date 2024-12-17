import { CreateTaskParticipantInput } from './create-task-participant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskParticipantInput extends PartialType(CreateTaskParticipantInput) {
  @Field(() => Int)
  id: number;
}
