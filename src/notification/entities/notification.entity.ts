import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { District } from '../../district/entities/district.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { NotificationActivity } from '../../notification-activity/entities/notification-activity.entity';
import { Village } from '../../village/entities/village.entity';
import { Zone } from '../../zone/entities/zone.entity';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Notification {
  @Field((type) => Int, { nullable: false })
  id: number;

  // @Field(() => [Mahallu], { nullable: true })
  // mahallus?: Mahallu[];

  // @Field(() => [Village], { nullable: true })
  // villages?: Village[];

  // @Field(() => [Zone], { nullable: true })
  // zones?: Zone[];

  // @Field(() => [District], { nullable: true })
  // districts?: District[];
  @Field(() => [Credential], { nullable: true })
  credentials?: Credential[];

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(()=> Boolean , { defaultValue: true, nullable: true })
  active?: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  viewedBy?: JSON;

  @Field(() => [NotificationActivity], { nullable: true })
  activities?: NotificationActivity[];

  @Field(() => Int, { nullable: true })
  createdById?: number;

  @Field(() => Credential, { nullable: true })
  createdBy?: Credential;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
