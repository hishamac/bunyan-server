import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';

@InputType()
export class CreateCampaignActivityInput {
  @Field(() => Int)
  targetId: number;

  @Field(() => ActionEnum)
  action: ActionEnum;

  @Field(() => Int)
  actorId: number;

  @Field()
  data: string;
}
