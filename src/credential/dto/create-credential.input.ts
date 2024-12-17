import { Field, InputType, Int } from '@nestjs/graphql';
import { RoleEnum } from '../../enums/role';

@InputType()
export class CreateCredentialInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => RoleEnum)
  role: RoleEnum;

  @Field(() => Int, { nullable: true })
  mahalluId: number;

  @Field(() => Int, { nullable: true })
  villageId: number;

  @Field(() => Int, { nullable: true })
  zoneId: number;

  @Field(() => Int, { nullable: true })
  districtId: number;
}
