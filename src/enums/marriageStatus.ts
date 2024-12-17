import { registerEnumType } from '@nestjs/graphql';

export enum MarriageStatusEnum {
  MARRIED = 'MARRIED',
  UNMARRIED = 'UNMARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
}

registerEnumType(MarriageStatusEnum, {
  name: 'MarriageStatusEnum',
});
