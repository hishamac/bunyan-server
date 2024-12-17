import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ActivityLog } from './entities/all-activities.entity';
import { ActivityLogService } from './all-activities.service';

@Resolver()
export class ActivityLogResolver {
  constructor(private activityLogService: ActivityLogService) {}

  @Query(() => [ActivityLog])
  async getActorActivityLog(
    @Args('actorId', { type: () => Int }) actorId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number
  ): Promise<ActivityLog[]> {
    return this.activityLogService.getActorActivityLog(actorId, limit, offset);
  }
}