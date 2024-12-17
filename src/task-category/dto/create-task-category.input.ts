import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskCategoryInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  color: string;

  @Field()
  description: string;

  @Field({ defaultValue: true })
  active: boolean;

}
