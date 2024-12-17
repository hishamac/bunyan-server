import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '../../enums/status';
import { CharityActivity } from '../../charity-activity/entities/charity-activity.entity';
import { Donation } from '../../donation/entities/donation.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Charity {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  posterUrl?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ defaultValue: true, nullable: true })
  admin?: boolean;

  @Field({ nullable: true })
  startingDate?: Date;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;

  @Field(() => [CharityActivity], { nullable: true })
  activities?: CharityActivity[];

  @Field(() => [Donation], { nullable: true })
  donations?: Donation[];

  @Field({ defaultValue: false, nullable: true })
  verified?: boolean;

  @Field((type) => Int, { nullable: true })
  target?: number;

  @Field({ nullable: true })
  expirationDate?: Date;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
