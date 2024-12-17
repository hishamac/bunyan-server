import { Field, InputType, Int } from '@nestjs/graphql';
import { EmploymentTypeEnum } from '../../enums/employmentType';
import { LocationTypeEnum } from '../../enums/locationType';
import { Status } from '../../enums/status';

@InputType()
export class CreateJobInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  location: string;

  @Field(() => EmploymentTypeEnum)
  employmentType: EmploymentTypeEnum;

  @Field(() => LocationTypeEnum)
  locationType: LocationTypeEnum;

  @Field()
  salaryRange: string;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => [String])
  skills: string[];

  @Field(() => Boolean, { defaultValue: false })
  admin: boolean;

  @Field({ defaultValue: new Date() })
  postedDate: Date;

  @Field(() => Boolean, { defaultValue: true })
  active: boolean;

  @Field(()=> Int , { nullable: true })
  createdById: number;

  @Field()
  expirationDate: Date;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ defaultValue: false })
  verified: boolean;
}
