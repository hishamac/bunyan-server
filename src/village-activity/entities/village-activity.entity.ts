import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Credential } from '../../credential/entities/credential.entity';
import { ActionEnum } from '../../enums/action';
import { Village } from '../../village/entities/village.entity';

@ObjectType()
export class VillageActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Village, { nullable: true })
  target?: Village;

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
