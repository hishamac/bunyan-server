import { Module } from '@nestjs/common';
import { YearActivityService } from './year-activity.service';
import { YearActivityResolver } from './year-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('yearActivity')],
  providers: [YearActivityResolver, YearActivityService],
  exports: [YearActivityService],
})
export class YearActivityModule {}