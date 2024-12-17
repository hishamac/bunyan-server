import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ActionEnum } from '../../enums/action';
import { Credential } from '../../credential/entities/credential.entity';
import { TaskParticipant } from '../../task-participant/entities/task-participant.entity';

@ObjectType()
export class TaskParticipantActivity {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  targetId?: number;

  @Field(() => TaskParticipant, { nullable: true })
  target?: TaskParticipant;

  @Field(() => ActionEnum, { nullable: true })
  action?: ActionEnum;

  @Field({ nullable: true })
  data?: string;

  @Field(() => Int, { nullable: true })
  actorId?: number;

  @Field(() => Credential, { nullable: true })
  actor?: Credential;

  @Field({ nullable: true })
  createdAt?: Date;
}
