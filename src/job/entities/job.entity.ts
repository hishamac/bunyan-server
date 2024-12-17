import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EmploymentTypeEnum } from '../../enums/employmentType';
import { LocationTypeEnum } from '../../enums/locationType';
import { Status } from '../../enums/status';
import { JobActivity } from '../../job-activity/entities/job-activity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Job {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => EmploymentTypeEnum, { nullable: true })
  employmentType?: EmploymentTypeEnum;

  @Field(() => LocationTypeEnum, { nullable: true })
  locationType?: LocationTypeEnum;

  @Field({ nullable: true })
  salaryRange?: string;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field(() => [String])
  skills?: string[];

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  admin?: boolean;

  @Field({ defaultValue: new Date() })
  postedDate?: Date;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  expirationDate?: Date;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  verified?: boolean;

  @Field(() => Int, { nullable: true })
  createdById?: number;

  @Field(() => [JobActivity], { nullable: true })
  activities?: JobActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
