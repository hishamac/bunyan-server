import { InputType, Int, Field } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';

@InputType()
export class CreateDistrictActivityInput {
  @Field(() => Int)
  targetId: number;

  @Field(() => ActionEnum)
  action: ActionEnum;

  @Field(() => Int)
  actorId: number;

  @Field()
  data: string;
}
