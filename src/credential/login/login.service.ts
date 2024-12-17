import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload , RefreshTokenPayload } from '../jwt/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(username: string) {
    const user = await this.prisma.credential.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.prisma.credential.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('Invalid Username ', HttpStatus.BAD_REQUEST);
    }

    if (user) {
      const isPasswordValid = await this.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid Password ', HttpStatus.BAD_REQUEST);
      }

      if (isPasswordValid) {
        const accessTokenPayload : AccessTokenPayload = {
          iss: 'localhost',
          sub: user.id,
          iat: Math.floor(Date.now() / 1000),
          role: user.role,
          username: user.username,
          mahalluId: user.mahalluId,
          districtId: user.districtId,
          villageId: user.villageId,
          zoneId: user.zoneId,
        };

        const refreshTokenPayload : RefreshTokenPayload = {
          sub: user.id,
          iat: Math.floor(Date.now() / 1000), 
        };
        
        const accessToken = await this.generateJwtToken(accessTokenPayload, '2h');
        const refreshToken = await this.generateJwtToken(refreshTokenPayload , '7d'); 

        return {
          accessToken,
          refreshToken,
          user
        };
      }
    }

    return null;
  }

  async checkLoggedIn(token: string) {
    // validate the token and find user based on id in the token and return the user
    const tokenValue = await this.validateJwtToken(token);
    const user = await this.prisma.credential.findFirst({
      where: {
        id: tokenValue.sub,
      },
    });

    // create new access token
    if (user) {
      const accessTokenPayload : AccessTokenPayload = {
        iss: 'localhost',
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
        role: user.role,
        username: user.username,
        mahalluId: user.mahalluId,
        districtId: user.districtId,
        villageId: user.villageId,
        zoneId: user.zoneId,
      };

      const accessToken = await this.generateJwtToken(accessTokenPayload, '2h');

      return {
        token : accessToken,
        user
      };
    }
  }

  // hashing the password
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    // hash the password with bcrypt
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  // compare password
  async comparePassword(password: string, hash: string) {
    // compare password with bcrypt
    const result = await bcrypt.compare(password, hash);
    return result;
  }

  // generate JWT token
  async generateJwtToken(user: AccessTokenPayload | RefreshTokenPayload , expiresIn?: string) {
    const token = await this.jwtService.sign(user,{
      secret: process.env.JWT_SECRET,
      expiresIn: expiresIn || '7d',
    });
    return token;
  }

  // validate JWT token
  async validateJwtToken(token: string) {
    const result = await this.jwtService.verify(token ,{
      secret: process.env.JWT_SECRET,
    });
    return result;
  }

  // decode JWT token
  async decodeJwtToken(token: string) {
    const result = await this.jwtService.decode(token);
    return result;
  }
}
