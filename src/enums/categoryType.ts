import { registerEnumType } from "@nestjs/graphql";

// Enum for category type
export enum CategoryTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
  }
  
  registerEnumType(CategoryTypeEnum, {
    name: 'CategoryTypeEnum', // Name of the enum in GraphQL schema
  });