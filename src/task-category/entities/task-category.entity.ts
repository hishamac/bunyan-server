import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OtherProgram } from '../../other-program/entities/other-program.entity';
import { TaskCategoryActivity } from '../../task-category-activity/entities/task-category-activity.entity';
import { Task } from '../../task/entities/task.entity';

@ObjectType()
export class TaskCategory {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  color?: string;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field(() => [OtherProgram], { nullable: true })
  otherPrograms?: OtherProgram[];

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;

  @Field(() => [TaskCategoryActivity], { nullable: true })
  activities?: TaskCategoryActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
