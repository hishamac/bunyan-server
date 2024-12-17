import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';
import { Credential } from '../../credential/entities/credential.entity';
import { Campaign } from '../../campaign/entities/campaign.entity';

@ObjectType()
export class CampaignActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Campaign, { nullable: true })
  target?: Campaign;

  @Field(() => ActionEnum, { nullable: true })
  action?: ActionEnum;

  @Field(() => Int, { nullable: true })
  actorId?: number;

  @Field(() => Credential, { nullable: true })
  actor?: Credential;

  @Field({ nullable: true })
  data?: string;

  @Field({ nullable: true })
  createdAt?: Date;
}
