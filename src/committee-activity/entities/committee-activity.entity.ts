import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';
import { Credential } from '../../credential/entities/credential.entity';
import { Committee } from '../../committee/entities/committee.entity';

@ObjectType()
export class CommitteeActivity {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => Committee, { nullable: true })
  target?: Committee;

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
