import { CreateTaskCategoryInput } from './create-task-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskCategoryInput extends PartialType(CreateTaskCategoryInput) {
  @Field(() => Int)
  id: number;
}
