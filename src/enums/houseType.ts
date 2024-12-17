import { registerEnumType } from '@nestjs/graphql';

export enum HouseTypeEnum {
  OWN = 'OWN',
  RENT = 'RENT',
}

registerEnumType(HouseTypeEnum, {
  name: 'HouseTypeEnum',
});
