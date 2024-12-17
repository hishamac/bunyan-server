import { Field, Int, Float, ObjectType } from '@nestjs/graphql';// Importing Account type if you want to return Account data
import { Account } from '../../account/entities/account.entity';
import { Category } from '../../category/entities/category.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';

@ObjectType()
export class Income {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  date?: Date; // Date field, could be string or a custom date scalar

  @Field((type) => Float, { nullable: true })
  amount?: number;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  categoryId?: number;

  @Field((type) => Category, { nullable: true })
  category?: Category; // Resolves the Category object using the foreign key

  @Field({ nullable: true })
  receivedBy?: string;

  @Field((type) => Int, { nullable: true })
  accountId?: number;

  @Field((type) => Account, { nullable: true })
  account?: Account; // Resolves the Account object using the foreign key

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
