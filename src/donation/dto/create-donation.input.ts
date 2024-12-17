import { Field, InputType, Int } from '@nestjs/graphql';
import { DonationStatusEnum } from '../../enums/donationStatus';

@InputType()
export class CreateDonationInput {
  @Field()
  name: string;

  @Field()
  contact: string;

  @Field(() => Boolean)
  guest: boolean;

  @Field(() => Int, { nullable: true })
  memberId?: number;

  @Field(() => Int)
  charityId: number;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  mahalluId: number;

  @Field(() => DonationStatusEnum)
  status: DonationStatusEnum;

  @Field()
  donatedAt: Date;
}
