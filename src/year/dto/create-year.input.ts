import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';
import { YearTypeEnum } from '../../enums/yearType';

@InputType()
export class CreateYearInput {
  @Field()
  name: string;

  @Field(() => YearTypeEnum)
  type: YearTypeEnum;
}
