import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateZoneInput {
  @Field()
  name: string;

  @Field(() => Int)
  districtId: number;

  @Field()
  username : string;

  @Field()
  password : string;

  @Field({ nullable: true })
  createdById?: number;
}
