import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDistrictInput {
  @Field()
  name: string;

  @Field()
  username : string;

  @Field()
  password : string;
}
