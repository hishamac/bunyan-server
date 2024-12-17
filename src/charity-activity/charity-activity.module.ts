import { Module } from '@nestjs/common';
import { CharityActivityService } from './charity-activity.service';
import { CharityActivityResolver } from './charity-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('charityActivity')],
  providers: [CharityActivityResolver, CharityActivityService],
  exports: [CharityActivityService],
})
export class CharityActivityModule {}