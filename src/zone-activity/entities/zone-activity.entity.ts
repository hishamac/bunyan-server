import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { ActionEnum } from '../../enums/action';
import { Zone } from '../../zone/entities/zone.entity';

@ObjectType()
export class ZoneActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Zone, { nullable: true })
  target?: Zone;

  @Field(() => ActionEnum, { nullable: true })
  action?: ActionEnum;

  @Field(() => Int, { nullable: true })
  actorId?: number;

  @Field(() => Credential, { nullable: true })
  actor?: Credential;

  @Field({ nullable: true })
  data?: string;

  @Field({ nullable: true })
  createdAt?: Date;
}
