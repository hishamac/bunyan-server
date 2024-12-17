import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ActionEnum } from "src/enums/action";

// Register the enum for GraphQL
registerEnumType(ActionEnum, {
  name: 'ActionEnum',
});

// Base Activity Type for GraphQL
@ObjectType()
export class ActivityLog {
  @Field(() => Int)
  id: number;

  @Field(() => ActionEnum)
  action: ActionEnum;

  @Field()
  data: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  targetType?: string;

  @Field(() => Int, { nullable: true })
  targetId?: number;
}