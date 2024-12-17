import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { TaskParticipantActivity } from '../../task-participant-activity/entities/task-participant-activity.entity';
import { Task } from '../../task/entities/task.entity';

@ObjectType()
export class TaskParticipant {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field((type) => Int, { nullable: true })
  taskId?: number; // Foreign key to the task

  @Field((type) => Task, { nullable: true })
  task?: Task;

  @Field((type) => [String])
  files?: string[]; // Array of file URLs or identifiers

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ defaultValue: true, nullable: true })
  claimed?: boolean;

  @Field({ defaultValue: true, nullable: true })
  verified?: boolean;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => [TaskParticipantActivity], { nullable: true })
  activities?: TaskParticipantActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
