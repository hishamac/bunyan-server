import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisModule } from './redis/redis.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MahalluModule } from './mahallu/mahallu.module';
import { MahalluActivityModule } from './mahallu-activity/mahallu-activity.module';
import { PostModule } from './post/post.module';
import { PostActivityModule } from './post-activity/post-activity.module';
import { PostInteractionModule } from './post-interaction/post-interaction.module';
import { JobModule } from './job/job.module';
import { JobActivityModule } from './job-activity/job-activity.module';
import { CharityModule } from './charity/charity.module';
import { CharityActivityModule } from './charity-activity/charity-activity.module';
import { FamilyModule } from './family/family.module';
import { FamilyActivityModule } from './family-activity/family-activity.module';
import { MemberModule } from './member/member.module';
import { MemberActivityModule } from './member-activity/member-activity.module';
import { CredentialModule } from './credential/credential.module';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { EventModule } from './event/event.module';
import { EventActivityModule } from './event-activity/event-activity.module';
import { NotificationModule } from './notification/notification.module';
import { CampaignModule } from './campaign/campaign.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskModule } from './task/task.module';
import { OtherProgramModule } from './other-program/other-program.module';
import { TaskActivityModule } from './task-activity/task-activity.module';
import { TaskParticipantModule } from './task-participant/task-participant.module';
import { CommitteeModule } from './committee/committee.module';
import { CommitteeActivityModule } from './committee-activity/committee-activity.module';
import { DonationModule } from './donation/donation.module';
import { CampaignActivityModule } from './campaign-activity/campaign-activity.module';
import { YearModule } from './year/year.module';
import { BadgeModule } from './badge/badge.module';
import { PrismaModule } from './prisma/prisma.module';
import { BaseModule } from './base/base.module';
import { AccountActivityModule } from './account-activity/account-activity.module';
import { BadgeActivityModule } from './badge-activity/badge-activity.module';
import { OtherProgramActivityModule } from './other-program-activity/other-program-activity.module';
import { TaskCategoryActivityModule } from './task-category-activity/task-category-activity.module';
import { YearActivityModule } from './year-activity/year-activity.module';
import { TaskParticipantActivityModule } from './task-participant-activity/task-participant-activity.module';
import { VillageModule } from './village/village.module';
import { ZoneModule } from './zone/zone.module';
import { DistrictModule } from './district/district.module';
import { VillageActivityModule } from './village-activity/village-activity.module';
import { ZoneActivityModule } from './zone-activity/zone-activity.module';
import { DistrictActivityModule } from './district-activity/district-activity.module';
import { NotificationActivityModule } from './notification-activity/notification-activity.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthRoleGuard } from './auth-role.guard';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DonationActivityModule } from './donation-activity/donation-activity.module';
import { FatwaModule } from './fatwa/fatwa.module';
import { ActivityModule } from './all-activities/all-activities.module';

@Module({
  imports: [
    RedisModule,
    BaseModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: 'schema.gql',
      autoSchemaFile:true,
      sortSchema: true,
      playground: false,
      introspection: true , //process.env.NODE_ENV !== 'production',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
      subscriptions: {
        'graphql-ws': true, // Enable WebSocket subscriptions
      },
    }),
    MahalluModule,
    MahalluActivityModule,
    PostModule,
    PostActivityModule,
    PostInteractionModule,
    JobModule,
    JobActivityModule,
    CharityModule,
    CharityActivityModule,
    FamilyModule,
    FamilyActivityModule,
    MemberModule,
    MemberActivityModule,
    CredentialModule,
    AccountModule,
    CategoryModule,
    ExpenseModule,
    IncomeModule,
    EventModule,
    EventActivityModule,
    NotificationModule,
    CampaignModule,
    TaskCategoryModule,
    TaskModule,
    OtherProgramModule,
    TaskActivityModule,
    TaskParticipantModule,
    CommitteeModule,
    CommitteeActivityModule,
    DonationModule,
    CampaignActivityModule,
    YearModule,
    BadgeModule,
    AccountActivityModule,
    BadgeActivityModule,
    OtherProgramActivityModule,
    TaskCategoryActivityModule,
    YearActivityModule,
    TaskParticipantActivityModule,
    VillageModule,
    ZoneModule,
    DistrictModule,
    VillageActivityModule,
    ZoneActivityModule,
    DistrictActivityModule,
    NotificationActivityModule,
    DonationActivityModule,
    FatwaModule,
    ActivityModule
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthRoleGuard,
  //   },
  // ],
})
export class AppModule {}
