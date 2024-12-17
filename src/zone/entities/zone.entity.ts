import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { District } from '../../district/entities/district.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Village } from '../../village/entities/village.entity';
import { ZoneActivity } from '../../zone-activity/entities/zone-activity.entity';

@ObjectType()
export class Zone {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Credential, { nullable: true })
  credential?: Credential;

  @Field(() => Int, { nullable: true })
  districtId?: number;

  @Field(() => District, { nullable: true })
  district?: District;

  @Field(() => [Village], { nullable: true })
  villages?: Village[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(() => [ZoneActivity], { nullable: true })
  activities?: ZoneActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
