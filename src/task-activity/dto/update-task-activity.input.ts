import { CreateTaskActivityInput } from './create-task-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskActivityInput extends PartialType(CreateTaskActivityInput) {
  @Field(() => Int)
  id: number;
}
