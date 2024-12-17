import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskParticipantInput {
  @Field(() => Int)
  taskId: number;

  @Field(() => [String])
  files: string[];

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  mahalluId: number;

  @Field({ nullable: true })
  remarks?: string;
}
