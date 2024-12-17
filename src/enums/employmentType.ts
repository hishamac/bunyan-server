import { registerEnumType } from '@nestjs/graphql';

export enum EmploymentTypeEnum {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  TEMPORARY = 'TEMPORARY',
  INTERN = 'INTERN',
}

registerEnumType(EmploymentTypeEnum, {
  name: 'EmploymentTypeEnum',
});
