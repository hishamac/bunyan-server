import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { LoginService } from '../login/login.service';
import { AccessTokenPayload ,RefreshTokenPayload } from '../jwt/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
    private readonly loginService: LoginService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]); 

    if (!requiredRoles) {
      return true; // No roles specified, allow access
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // get the cookie
    const cookie = req.cookies['__user'];

    // if the cookie is not set, return false
    if (!cookie) {
      // change to return false
      return true;
    }

    // if the cookie is set, verify the token
    const token: RefreshTokenPayload = await this.loginService.validateJwtToken(cookie);

    // Assign roles based on the id
    const id = token.sub; // Assuming the id is sent in the request headers

    if (!id) {
      // change to return false
      return true;
    }

    // find the user in the database
    const user = await this.prismaService.credential.findFirst({
      where: { id },
      include: {
        mahallu: true,
        district: true,
        village: true,
        zone: true,
      },
    });

    if (!user) {
      // change to return false
      return true;
    }

    // Assign the user to the request object
    req.user = user;

    if (requiredRoles.includes(RoleEnum.USER)) {
      return true; // Super admin can access all routes
    }
    
    // Check if the user has access to the requested role
    return requiredRoles.some(role => req.user?.role === role);
  }
}