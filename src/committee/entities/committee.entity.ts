import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommitteeActivity } from '../../committee-activity/entities/committee-activity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Member } from '../../member/entities/member.entity';

@ObjectType()
export class Committee {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field((type) => Int, { nullable: true })
  memberId?: number;

  @Field(() => Member, { nullable: true })
  member?: Member;

  @Field({ nullable: true })
  position?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field(() => [CommitteeActivity], { nullable: true })
  activities?: CommitteeActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
