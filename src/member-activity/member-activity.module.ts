import { Module } from '@nestjs/common';
import { MemberActivityService } from './member-activity.service';
import { MemberActivityResolver } from './member-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('memberActivity')],
  providers: [MemberActivityResolver, MemberActivityService],
  exports: [MemberActivityService],
})
export class MemberActivityModule {}