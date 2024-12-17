import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { District } from '../../district/entities/district.entity';
import { ActionEnum } from '../../enums/action';

@ObjectType()
export class DistrictActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => District, { nullable: true })
  target?: District;

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
