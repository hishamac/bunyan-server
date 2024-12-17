import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { Donation } from '../../donation/entities/donation.entity';
import { ActionEnum } from '../../enums/action';

@ObjectType()
export class DonationActivity {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Donation, { nullable: true })
  target?: Donation;

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
