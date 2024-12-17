import { InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class CreateBadgeInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  icon: string;

  @Field(() => Int)
  yearId: number;
}
