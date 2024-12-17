import { Module } from '@nestjs/common';
import { OtherProgramService } from './other-program.service';
import { OtherProgramResolver } from './other-program.resolver';

import { RedisModule } from '../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';
import { OtherProgramActivityModule } from '../other-program-activity/other-program-activity.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    BaseModule.forFeature('otherProgram'),
    OtherProgramActivityModule,
    CredentialModule,
  ],
  providers: [OtherProgramResolver, OtherProgramService],
})
export class OtherProgramModule {}
