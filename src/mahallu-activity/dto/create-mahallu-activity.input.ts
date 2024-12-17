import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';

@InputType()
export class CreateMahalluActivityInput {
  @Field(() => Int)
  targetId: number;

  @Field(() => ActionEnum)
  action: ActionEnum;

  @Field(() => Int)
  actorId: number;

  @Field()
  data: string;
}
