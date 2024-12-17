import { CreateTaskCategoryActivityInput } from './create-task-category-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskCategoryActivityInput extends PartialType(CreateTaskCategoryActivityInput) {
  @Field(() => Int)
  id: number;
}
