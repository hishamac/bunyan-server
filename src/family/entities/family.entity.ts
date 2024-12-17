import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HouseTypeEnum } from '../../enums/houseType';
import { RationCardTypeEnum } from '../../enums/rationCardType';
import { FamilyActivity } from '../../family-activity/entities/family-activity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Member } from '../../member/entities/member.entity';

@ObjectType()
export class Family {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  regNo?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  block?: string;

  @Field({ nullable: true })
  houseNumber?: string;

  @Field({ nullable: true })
  houseHolder?: string;

  @Field({ nullable: true })
  houseName?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ nullable: true })
  place?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  whatsapp?: string;

  @Field(() => HouseTypeEnum, { nullable: true })
  houseType?: HouseTypeEnum;

  @Field(() => RationCardTypeEnum, { nullable: true })
  rationCardType?: RationCardTypeEnum;

  @Field({ nullable: true })
  panchayathMunicipality?: string;

  @Field({ nullable: true })
  panchayathWardNo?: string;

  @Field({ nullable: true })
  wardHouseNo?: string;

  @Field(() => [FamilyActivity], { nullable: true })
  activities?: FamilyActivity[];

  @Field(() => [Member], { nullable: true })
  members?: Member[];

  @Field({ nullable: true })
  createdBy?: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
