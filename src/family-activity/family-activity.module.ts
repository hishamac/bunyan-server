import { Module } from '@nestjs/common';
import { FamilyActivityService } from './family-activity.service';
import { FamilyActivityResolver } from './family-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('familyActivity')],
  providers: [FamilyActivityResolver, FamilyActivityService],
  exports: [FamilyActivityService],
})
export class FamilyActivityModule {}