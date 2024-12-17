import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Credential } from 'src/credential/entities/credential.entity';

export enum FatwaStatus {
  PENDING = 'PENDING',
  ANSWERED = 'ANSWERED',
  REJECTED = 'REJECTED',
}

// Register the enum for GraphQL
registerEnumType(FatwaStatus, {
  name: 'FatwaStatus',
  description: 'The status of the fatwa (Pending, Answered, Rejected)',
});

@ObjectType()
export class Fatwa {
  @Field(() => Int, {
    nullable: true,
    description: 'Unique identifier for the fatwa',
  })
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'The question asked by the user',
  })
  question: string;

  @Field(() => String, {
    nullable: true,
    description: 'The mobile number of the questioner',
  })
  questionerMobile: string;

  @Field(() => Date, {
    nullable: true,
    description: 'The timestamp when the question was asked',
  })
  askedAt: Date;

  @Field(() => String, {
    nullable: true,
    description: 'The answer provided for the question',
  })
  answer?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'ID of the scholar who answered the question',
  })
  answeredById?: number;

  @Field(() => Credential, {
    nullable: true,
    description: 'Details of the scholar who answered the question',
  })
  answeredBy?: Credential;

  @Field(() => Date, {
    nullable: true,
    description: 'The timestamp when the question was answered',
  })
  answeredAt?: Date;

  @Field(() => FatwaStatus, { description: 'The current status of the fatwa' })
  status: FatwaStatus;

  @Field(() => Date, {
    description: 'The timestamp when the fatwa record was created',
  })
  createdAt: Date;
}
