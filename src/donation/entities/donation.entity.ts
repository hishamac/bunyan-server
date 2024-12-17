import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DonationStatusEnum } from '../../enums/donationStatus';
import { Charity } from '../../charity/entities/charity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Member } from '../../member/entities/member.entity';
import { DonationActivity } from '../../donation-activity/entities/donation-activity.entity';

@ObjectType()
export class Donation {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field(() => Boolean, { nullable: true })
  guest?: boolean;

  @Field(() => Int, { nullable: true })
  memberId?: number;

  @Field(() => Member, { nullable: true })
  member?: Member;

  @Field((type) => Int, { nullable: true })
  charityId?: number;

  @Field(() => Charity, { nullable: true })
  charity?: Charity;

  @Field((type) => Int, { nullable: true })
  amount?: number;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field((type) => DonationStatusEnum, { nullable: true })
  status?: DonationStatusEnum;

  @Field(() => [DonationActivity], { nullable: true })
  activities?: DonationActivity[];

  @Field({ nullable: true })
  donatedAt?: Date;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
