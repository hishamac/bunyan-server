import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CredentialService } from '../credential.service';
import { LoginService } from './login.service';
import { HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Credential } from '../entities/credential.entity';
import { Response } from 'express';
import { AuthResponse } from './login.type';
import { RolesGuard } from '../roles/roles.guard';

@Resolver(() => Credential)
@UseGuards(RolesGuard)
export class LoginResolver {
  constructor(
    private readonly credentialsService: CredentialService,
    private readonly loginService: LoginService,
  ) {}

  @Mutation(() => AuthResponse)
  @UseGuards(LoginGuard)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context('res') context: Response,
  ) {
    try {
      
      const val = await this.loginService.login(username, password);
      if (!val) {
        throw new Error('Invalid Username or Password');
      }

      if (val.refreshToken) {
        context.cookie('__user', val.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'lax',
          secure: true,
        });

        context.setHeader(
          'Set-Cookie',
          `__user=${val.refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=None; Secure;`,
        );

        return {
          token : val.accessToken,
          user: val.user
        }
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Query(() => AuthResponse)
  @UseGuards(RolesGuard)
  async checkLoggedIn(@Context() context: any) {
    const cookie = context.req.cookies['__user'];
    
    if (!cookie) {
      throw new HttpException('Not Logged In', HttpStatus.UNAUTHORIZED);
    }
    return this.loginService.checkLoggedIn(cookie);
  }

  // logout
  @Mutation(() => Boolean)
  async logout(@Context() context: any) {
    context.res.clearCookie('__user', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return true;
  }

}
