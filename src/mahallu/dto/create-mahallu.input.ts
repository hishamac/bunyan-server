import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMahalluInput {
  @Field()
  regNo: string;

  @Field()
  name: string;

  @Field()
  place: string;

  @Field()
  contact: string;

  @Field()
  pinCode: string;

  @Field()
  postOffice: string;

  @Field(() => Int)
  villageId: number;

  @Field()
  username : string;

  @Field()
  password : string;

  @Field({ nullable: true })
  totalPoints?: number;

  @Field({ nullable: true })
  createdById?: number;
}
