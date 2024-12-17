import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { VillageActivity } from '../../village-activity/entities/village-activity.entity';
import { Zone } from '../../zone/entities/zone.entity';

@ObjectType()
export class Village {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Credential, { nullable: true })
  credential?: Credential;

  @Field(() => Int, { nullable: true })
  zoneId?: number;

  @Field(() => Zone, { nullable: true })
  zone?: Zone;

  @Field(() => [Mahallu], { nullable: true })
  mahallus?: Mahallu[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(()=> [VillageActivity], { nullable: true })
  activities?: VillageActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
