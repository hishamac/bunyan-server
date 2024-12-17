import { InputType, Field } from '@nestjs/graphql';
import { FatwaStatus } from '../entities/fatwa.entity';

@InputType()
export class CreateFatwaInput {
  @Field(() => String, { description: 'The question asked by the user' })
  question: string;

  @Field(() => String, { description: 'The mobile number of the questioner' })
  questionerMobile: string;

  @Field(() => FatwaStatus, { description: 'The current status of the fatwa', defaultValue: FatwaStatus.PENDING })
  status: FatwaStatus;
}
