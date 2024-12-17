import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '../../enums/status';

@InputType()
export class CreateCharityInput {
  @Field()
  posterUrl: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field({ defaultValue: false })
  admin: boolean;

  @Field()
  startingDate: Date;

  @Field({ defaultValue: true })
  active: boolean;

  @Field(() => Boolean, { defaultValue: false })
  verified: boolean;

  @Field(() => Int)
  target: number;

  @Field()
  expirationDate: Date;

  @Field({ nullable: true })
  remarks?: string;
}
