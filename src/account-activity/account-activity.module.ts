import { Module } from '@nestjs/common';
import { AccountActivityService } from './account-activity.service';
import { AccountActivityResolver } from './account-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('accountActivity')],
  providers: [AccountActivityResolver, AccountActivityService],
  exports: [AccountActivityService],
})
export class AccountActivityModule {}