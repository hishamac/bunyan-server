import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MAHALLU_ADMIN = 'MAHALLU_ADMIN',
  VILLAGE_ADMIN = 'VILLAGE_ADMIN',
  ZONE_ADMIN = 'ZONE_ADMIN',
  DISTRICT_ADMIN = 'DISTRICT_ADMIN',
  INFO_ADMIN = 'INFO_ADMIN',
  USER = 'USER',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
