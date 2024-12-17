import { RoleEnum } from "@prisma/client";

export interface AccessTokenPayload {
  iss: string; // Issuer
  sub: number; // User ID\
  iat: number; // Issued At
  role: RoleEnum; // Role
  username: string; // Username
  mahalluId: number; // Mahallu ID
  districtId: number; // District ID
  villageId: number; // Village ID
  zoneId: number; // Zone ID
}

export interface RefreshTokenPayload {
  sub: number; // User ID
  iat : number; // Issued At
}
