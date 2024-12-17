import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';
import { Credential } from '../../credential/entities/credential.entity';
import { OtherProgram } from '../../other-program/entities/other-program.entity';

@ObjectType()
export class OtherProgramActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => OtherProgram, { nullable: true })
  target?: OtherProgram;

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
