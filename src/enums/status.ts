import { registerEnumType } from '@nestjs/graphql';

// Define the enum for the status field
export enum Status {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Register the enum with GraphQL
registerEnumType(Status, {
  name: 'Status',
});
