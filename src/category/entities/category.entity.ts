import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CategoryTypeEnum } from '../../enums/categoryType';
import { Expense } from '../../expense/entities/expense.entity';
import { Income } from '../../income/entities/income.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Category {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  name?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field((type) => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field((type) => CategoryTypeEnum, { nullable: true })
  type?: CategoryTypeEnum;

  @Field(() => [Income], { nullable: true })
  incomes?: Income[];

  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
