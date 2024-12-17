import { Field, InputType, Int } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';

@InputType()
export class CreateTaskActivityInput {
  @Field(() => Int)
  targetId: number;

  @Field(() => ActionEnum)
  action: ActionEnum;

  @Field(() => Int)
  actorId: number;

  @Field()
  data: string;
}
