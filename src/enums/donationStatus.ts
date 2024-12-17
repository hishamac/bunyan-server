import { registerEnumType } from '@nestjs/graphql';

export enum DonationStatusEnum {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

registerEnumType(DonationStatusEnum, {
  name: 'DonationStatusEnum',
});
