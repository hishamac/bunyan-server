import { Module } from '@nestjs/common';
import { MahalluActivityService } from './mahallu-activity.service';
import { MahalluActivityResolver } from './mahallu-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('mahalluActivity')],
  providers: [MahalluActivityResolver, MahalluActivityService],
  exports: [MahalluActivityService],
})
export class MahalluActivityModule {}