import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVillageInput {
  @Field()
  name: string;

  @Field(() => Int)
  zoneId: number;

  @Field()
  username : string;

  @Field()
  password : string;

  @Field({ nullable: true })
  createdById?: number;
}
