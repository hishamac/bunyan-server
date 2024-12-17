import { Field, ObjectType } from '@nestjs/graphql';
import { Credential } from '../entities/credential.entity';

@ObjectType()
export class AuthResponse {
  @Field({nullable: true})
  token: string;
  @Field(() => Credential , {nullable: true})
  user: Credential;
}
