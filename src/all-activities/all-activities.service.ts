import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityLog } from './entities/all-activities.entity';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  async getActorActivityLog(
    actorId: number,
    limit: number = 50,
    offset: number = 0,
  ): Promise<ActivityLog[]> {
    // Define all activity models with their target model names
    const activityModels = [
      { name: 'mahalluActivity', targetType: 'Mahallu' },
      { name: 'postActivity', targetType: 'Post' },
      { name: 'jobActivity', targetType: 'Job' },
      { name: 'charityActivity', targetType: 'Charity' },
      { name: 'familyActivity', targetType: 'Family' },
      { name: 'memberActivity', targetType: 'Member' },
      { name: 'accountActivity', targetType: 'Account' },
      { name: 'committeeActivity', targetType: 'Committee' },
      { name: 'eventActivity', targetType: 'Event' },
      { name: 'campaignActivity', targetType: 'Campaign' },
      { name: 'taskCategoryActivity', targetType: 'TaskCategory' },
      { name: 'taskActivity', targetType: 'Task' },
      { name: 'otherProgramActivity', targetType: 'OtherProgram' },
      { name: 'yearActivity', targetType: 'Year' },
      { name: 'badgeActivity', targetType: 'Badge' },
      { name: 'taskParticipantActivity', targetType: 'TaskParticipant' },
      { name: 'villageActivity', targetType: 'Village' },
      { name: 'zoneActivity', targetType: 'Zone' },
      { name: 'districtActivity', targetType: 'District' },
      { name: 'notificationActivity', targetType: 'Notification' },
      { name: 'donationActivity', targetType: 'Donation' },
    ];

    // Dynamically query all activity models
    const activities: ActivityLog[] = [];

    for (const model of activityModels) {
      try {
        const modelActivities = await this.prisma[model.name].findMany({
          where: { actorId },
          take: limit,
          skip: offset,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            action: true,
            data: true,
            createdAt: true,
            targetId: true,
          },
        });

        // Add target type to each activity
        const typedActivities = modelActivities.map((activity) => ({
          ...activity,
          targetType: model.targetType,
        }));

        activities.push(...typedActivities);
      } catch (error) {
        console.error(`Error querying ${model.name}:`, error);
      }
    }

    // Sort and limit the activities
    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}
