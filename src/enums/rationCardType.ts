import { registerEnumType } from "@nestjs/graphql";

export enum RationCardTypeEnum {
    APL = 'APL',
    BPL = 'BPL',
}

registerEnumType(RationCardTypeEnum, {
    name: 'RationCardTypeEnum',
});