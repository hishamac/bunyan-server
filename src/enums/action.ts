import { registerEnumType } from "@nestjs/graphql";

export enum ActionEnum {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    VERIFY = 'VERIFY',
    CLAIM = 'CLAIM',
    REJECT = 'REJECT',
    ADD_REMARKS = 'ADD_REMARKS',
  }
  
  registerEnumType(ActionEnum, {
    name: 'ActionEnum',
  });