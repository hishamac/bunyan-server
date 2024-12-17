import { registerEnumType } from '@nestjs/graphql';

export enum YearTypeEnum {
  CURRENT = 'CURRENT',
  PAST = 'PAST',
  ALL = 'ALL',
}

registerEnumType(YearTypeEnum, {
  name: 'YearTypeEnum',
});
