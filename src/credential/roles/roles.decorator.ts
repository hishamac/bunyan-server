import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../enums/role';

// The HasRoles decorator is used to assign roles to a resolver
export const Roles = (...roles: RoleEnum[] ) => SetMetadata('role', roles);