import { Module } from '@nestjs/common';
import { PostActivityService } from './post-activity.service';
import { PostActivityResolver } from './post-activity.resolver';
import { BaseActivityModule } from '../base-activity/base-activity.module';

@Module({
  imports: [BaseActivityModule.forFeature('postActivity')],
  providers: [PostActivityResolver, PostActivityService],
  exports: [PostActivityService],
})
export class PostActivityModule {}