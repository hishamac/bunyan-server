import { Module } from '@nestjs/common';
import { OtherProgramActivityService } from './other-program-activity.service';
import { OtherProgramActivityResolver } from './other-program-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('otherActivity')],
  providers: [OtherProgramActivityResolver, OtherProgramActivityService],
  exports: [OtherProgramActivityService],
})
export class OtherProgramActivityModule {}