import { Module } from '@nestjs/common';
import { VillageActivityService } from './village-activity.service';
import { VillageActivityResolver } from './village-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('villageActivity')],
  providers: [VillageActivityResolver, VillageActivityService],
  exports: [VillageActivityService],
})
export class VillageActivityModule {}