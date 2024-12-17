import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryTypeEnum } from '../../enums/categoryType';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => Int)
  mahalluId: number;

  @Field(() => CategoryTypeEnum)
  type: CategoryTypeEnum;
}
