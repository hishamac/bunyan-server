import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialResolver } from './credential.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { LoginResolver } from './login/login.resolver';
import { LoginService } from './login/login.service';
import { LocalStrategy } from './login/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('credential'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [
    CredentialResolver,
    CredentialService,
    LoginResolver,
    LoginService,
    LocalStrategy,
  ],
  exports: [
    CredentialResolver,
    CredentialService,
    LoginResolver,
    LoginService,
    LocalStrategy,
  ],
})
export class CredentialModule {}
