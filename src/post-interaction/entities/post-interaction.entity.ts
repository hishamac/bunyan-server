import { Field, Int, ObjectType } from '@nestjs/graphql';
import { InteractionEnum } from '../../enums/interaction';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class PostInteraction {
  @Field(() => Int, { nullable: false })
  id:number;

  @Field(() => Int, { nullable: true })
  postId?: number;

  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field(() => Boolean, { nullable: true })
  guest?: boolean;

  @Field({ nullable: true })
  createdAt?: Date;
}
