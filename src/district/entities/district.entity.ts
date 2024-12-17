import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { DistrictActivity } from '../../district-activity/entities/district-activity.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Zone } from '../../zone/entities/zone.entity';

@ObjectType()
export class District {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Credential, { nullable: true })
  credential?: Credential;

  @Field(() => [Zone], { nullable: true })
  zones?: Zone[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(() => [DistrictActivity], { nullable: true })
  activities?: DistrictActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
