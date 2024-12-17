import { CreateJobActivityInput } from './create-job-activity.input';
import { InputType, Field, Int ,PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateJobActivityInput extends PartialType(CreateJobActivityInput) {
  @Field(() => Int)
  id: number;
}
