import { Field, InputType, Int } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender';
import { MarriageStatusEnum } from '../../enums/marriageStatus';

@InputType()
export class CreateMemberInput {
  @Field(() => Int, { nullable: true })
  familyId?: number;

  @Field({ nullable: true })
  contact: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  relationToHouseHolder?: string;

  @Field(() => GenderEnum)
  gender: GenderEnum;

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
  abroad?: boolean;

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
}
