import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { OtherProgramActivity } from '../../other-program-activity/entities/other-program-activity.entity';
import { TaskCategory } from '../../task-category/entities/task-category.entity';

@ObjectType()
export class OtherProgram {
  @Field((type) => Int, { nullable: false })
  id:number;

  @Field((type) => [String], { nullable: true })
  files?: string[]; // Array of file URLs or identifiers

  @Field((type) => Int, { nullable: true })
  categoryId?: number;

  @Field((type) => TaskCategory, { nullable: true })
  category?: TaskCategory;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field({ defaultValue: true, nullable: true })
  claimed?: boolean;

  @Field({ defaultValue: true, nullable: true })
  verified?: boolean;

  @Field((type) => Int, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  remarks?: string;

  @Field(() => [OtherProgramActivity], { nullable: true })
  activities?: OtherProgramActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
