import { registerEnumType } from '@nestjs/graphql';

export enum LocationTypeEnum {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

registerEnumType(LocationTypeEnum, {
  name: 'LocationTypeEnum',
});
