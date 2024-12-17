import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender';
import { MarriageStatusEnum } from '../../enums/marriageStatus';
import { Donation } from '../../donation/entities/donation.entity';
import { Family } from '../../family/entities/family.entity';
import { MemberActivity } from '../../member-activity/entities/member-activity.entity';
import { Committee } from '../../committee/entities/committee.entity';

@ObjectType()
export class Member {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  regNo?: string;

  @Field(() => Int, { nullable: true })
  familyId?: number;

  @Field(() => Family, { nullable: true })
  family?: Family;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  relationToHouseHolder?: string;

  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;

  @Field({ nullable: true })
  bloodGroup?: string;

  @Field({ nullable: true })
  yearOfBirth?: Date;

  @Field({ nullable: true })
  healthCondition?: string;

  @Field(() => MarriageStatusEnum, { nullable: true })
  maritalStatus?: MarriageStatusEnum;

  @Field({ nullable: true })
  job?: string;

  @Field({ nullable: true })
  jobSector?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  abroad?: Boolean;

  @Field({ nullable: true })
  abroadPlace?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  orphan?: boolean;

  @Field({ nullable: true })
  islamicQualification?: string;

  @Field({ nullable: true })
  generalQualification?: string;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => [MemberActivity], { nullable: true })
  activities?: MemberActivity[];

  @Field(() => Committee, { nullable: true })
  committee?: Committee;

  @Field(() => [Donation], { nullable: true })
  donations?: Donation[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
