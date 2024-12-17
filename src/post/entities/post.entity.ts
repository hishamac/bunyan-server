import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { PostActivity } from '../../post-activity/entities/post-activity.entity';
import { PostInteraction } from '../../post-interaction/entities/post-interaction.entity';

@ObjectType()
export class Post {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  fileURL?: string;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field(() => Int, { nullable: true })
  likes?: number;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  active?: boolean;

  @Field(() => [PostActivity], { nullable: true })
  activities?: PostActivity[];

  @Field(() => [PostInteraction], { nullable: true })
  interactions?: PostInteraction[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
