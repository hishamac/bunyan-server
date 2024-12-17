import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from './enums/role';
import * as jwt from 'jsonwebtoken'; // Use your JWT library
import { PrismaService } from './prisma/prisma.service';
import { RefreshTokenPayload } from './credential/jwt/jwt.interface';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    console.log(roles);

    const request = context.switchToHttp().getRequest();

    console.log(request);

    // Extract token from cookies or headers
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException(
        'Authorization token is missing in cookies or headers.',
      );
    }

    // Decode and validate the token
    try {
      const decoded = await this.validateToken(token);
      // const user = await this.prismaService.credential.findUnique({
      //   where: { id: decoded. },
      // });
      if (!decoded) {
        throw new UnauthorizedException('User not found.');
      }
      request.user = decoded; // Attach user information to the request object
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    // Role-based authorization
    if (roles && roles.length > 0) {
      const userRole: RoleEnum = request.user.role;
      if (!roles.includes(userRole)) {
        throw new ForbiddenException(`Access denied for role: ${userRole}.}.`);
      }
    }

    return true;
  }

  private extractToken(request: any): string | null {
    // Check for token in cookies
    if (request.cookies?.token) {
      return request.cookies.token;
    }

    // Check for token in Authorization header
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Extract token after "Bearer "
    }

    return null;
  }

  private async validateToken(token: string): Promise<any> {
    try {
      // Replace 'your-secret-key' with your actual JWT secret
      const decoded: RefreshTokenPayload = await this.validateToken(token);

      // Assign roles based on the sub
      const id = decoded.sub; // Assuming the sub is sent in the request headers

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
        throw new UnauthorizedException('User not found.');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
