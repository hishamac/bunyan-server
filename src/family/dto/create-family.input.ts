import { Field, InputType, Int } from '@nestjs/graphql';
import { HouseTypeEnum } from '../../enums/houseType';
import { RationCardTypeEnum } from '../../enums/rationCardType';

@InputType()
export class CreateFamilyInput {
  @Field()
  name: string;

  @Field()
  block: string;

  @Field()
  houseNumber: string;

  @Field()
  houseHolder: string;

  @Field()
  houseName: string;

  @Field(() => Int)
  mahalluId: number;

  @Field()
  place: string;

  @Field()
  mobile: string;

  @Field()
  whatsapp: string;

  @Field(() => HouseTypeEnum)
  houseType: HouseTypeEnum;

  @Field(() => RationCardTypeEnum)
  rationCardType: RationCardTypeEnum;

  @Field()
  panchayathMunicipality: string;

  @Field()
  panchayathWardNo: string;

  @Field()
  wardHouseNo: string;
}
