import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  posterURL: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ defaultValue: false })
  online: boolean;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field({ defaultValue: false })
  admin: boolean;

  @Field()
  startingDate: Date;

  @Field()
  endingDate: Date;

  @Field({ defaultValue: true })
  active: boolean;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => Int, { nullable: true })
  createdById?: number;

  @Field({ defaultValue: false })
  verified: boolean;
}
