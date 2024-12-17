import { Module } from '@nestjs/common';
import { ZoneActivityService } from './zone-activity.service';
import { ZoneActivityResolver } from './zone-activity.resolver';

@Module({
  providers: [ZoneActivityResolver, ZoneActivityService],
  exports: [ZoneActivityService],
})
export class ZoneActivityModule {}
