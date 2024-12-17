import { registerEnumType } from '@nestjs/graphql';

export enum PermissionTypesEnum {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  // Add more permissions as necessary
}

registerEnumType(PermissionTypesEnum, {
  name: 'PermissionTypesEnum',
});
