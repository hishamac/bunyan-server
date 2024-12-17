import { registerEnumType } from "@nestjs/graphql";

export enum InteractionEnum {
    VIEW = 'VIEW',
    LIKE = 'LIKE',
  }
  
  // Register the enum with GraphQL
  registerEnumType(InteractionEnum, {
    name: 'InteractionEnum',
  });