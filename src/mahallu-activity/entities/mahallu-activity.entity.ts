import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';
import { Credential } from '../../credential/entities/credential.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class MahalluActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Mahallu, { nullable: true })
  target?: Mahallu;

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
