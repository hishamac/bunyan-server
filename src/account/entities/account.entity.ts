import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { AccountActivity } from '../../account-activity/entities/account-activity.entity';
import { Expense } from '../../expense/entities/expense.entity';
import { Income } from '../../income/entities/income.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Account {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  name?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field((type) => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field((type) => Float, { defaultValue: 0, nullable: true })
  balance?: number;

  @Field((type) => [Income], { nullable: true })
  incomes?: Income[];

  @Field((type) => [Expense], { nullable: true })
  expenses?: Expense[];

  @Field(() => [AccountActivity], { nullable: true })
  activities?: AccountActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
