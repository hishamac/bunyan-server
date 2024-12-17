import { Module } from '@nestjs/common';
import { DistrictActivityService } from './district-activity.service';
import { DistrictActivityResolver } from './district-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('districtActivity')],
  providers: [DistrictActivityResolver, DistrictActivityService],
  exports: [DistrictActivityService],
})
export class DistrictActivityModule {}
