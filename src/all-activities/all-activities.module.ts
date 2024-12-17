import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityLogService } from './all-activities.service';
import { ActivityLogResolver } from './all-activities.resolver';

@Module({
  imports: [
    PrismaModule, // Ensure PrismaModule is imported
  ],
  providers: [
    // Activity Log Services and Resolvers
    ActivityLogService,
    ActivityLogResolver,
  ],
  exports: [
    // Export services if they need to be used in other modules
    ActivityLogService,
  ],
})
export class ActivityModule {}
