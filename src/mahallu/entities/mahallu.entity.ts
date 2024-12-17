import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { MahalluActivity } from '../../mahallu-activity/entities/mahallu-activity.entity';
import { Job } from '../../job/entities/job.entity';
import { Charity } from '../../charity/entities/charity.entity';
import { Family } from '../../family/entities/family.entity';
import { Account } from '../../account/entities/account.entity';
import { Category } from '../../category/entities/category.entity';
import { Income } from '../../income/entities/income.entity';
import { Expense } from '../../expense/entities/expense.entity';
import { Committee } from '../../committee/entities/committee.entity';
import { Event } from '../../event/entities/event.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { TaskParticipant } from '../../task-participant/entities/task-participant.entity';
import { OtherProgram } from '../../other-program/entities/other-program.entity';
import { PostInteraction } from '../../post-interaction/entities/post-interaction.entity';
import { Donation } from '../../donation/entities/donation.entity';
import { Village } from '../../village/entities/village.entity';
import { Credential } from '../../credential/entities/credential.entity';
import { Badge } from 'src/badge/entities/badge.entity';

@ObjectType()
export class Mahallu {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  regNo?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  place?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  pinCode?: string;

  @Field({ nullable: true })
  postOffice?: string;

  @Field(() => Int, { nullable: true })
  totalPoints?: number;

  @Field(() => Credential, { nullable: true })
  credential?: Credential;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Job], { nullable: true })
  jobs?: Job[];

  @Field(() => [Charity], { nullable: true })
  charities?: Charity[];

  @Field(() => [Donation], { nullable: true })
  donations?: Donation[];

  @Field(() => [MahalluActivity], { nullable: true })
  activities?: MahalluActivity[];

  @Field(() => [Committee], { nullable: true })
  committees?: Committee[];

  @Field(() => [Account], { nullable: true })
  accounts?: Account[];

  @Field(() => [Category], { nullable: true })
  categories?: Category[];

  @Field(() => [Income], { nullable: true })
  incomes?: Income[];

  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @Field(() => [Family], { nullable: true })
  families?: Family[];

  @Field(() => [Event], { nullable: true })
  events?: Event[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(() => [TaskParticipant], { nullable: true })
  taskParticipants?: TaskParticipant[];

  @Field(() => [OtherProgram], { nullable: true })
  otherPrograms?: OtherProgram[];

  @Field(() => [PostInteraction], { nullable: true })
  postInteractions?: PostInteraction[];

  @Field(() => Int, { nullable: true })
  villageId?: number;

  @Field(() => Village, { nullable: true })
  village?: Village;

  @Field(() => [Badge]  , { nullable: true })
  badges?: Badge[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
