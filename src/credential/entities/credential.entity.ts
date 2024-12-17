import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleEnum } from '../../enums/role';
import { AccountActivity } from '../../account-activity/entities/account-activity.entity';
import { BadgeActivity } from '../../badge-activity/entities/badge-activity.entity';
import { CampaignActivity } from '../../campaign-activity/entities/campaign-activity.entity';
import { CharityActivity } from '../../charity-activity/entities/charity-activity.entity';
import { DistrictActivity } from '../../district-activity/entities/district-activity.entity';
import { EventActivity } from '../../event-activity/entities/event-activity.entity';
import { FamilyActivity } from '../../family-activity/entities/family-activity.entity';
import { JobActivity } from '../../job-activity/entities/job-activity.entity';
import { MahalluActivity } from '../../mahallu-activity/entities/mahallu-activity.entity';
import { MemberActivity } from '../../member-activity/entities/member-activity.entity';
import { OtherProgramActivity } from '../../other-program-activity/entities/other-program-activity.entity';
import { CommitteeActivity } from '../../committee-activity/entities/committee-activity.entity';
import { PostActivity } from '../../post-activity/entities/post-activity.entity';
import { TaskActivity } from '../../task-activity/entities/task-activity.entity';
import { TaskCategoryActivity } from '../../task-category-activity/entities/task-category-activity.entity';
import { TaskParticipantActivity } from '../../task-participant-activity/entities/task-participant-activity.entity';
import { VillageActivity } from '../../village-activity/entities/village-activity.entity';
import { YearActivity } from '../../year-activity/entities/year-activity.entity';
import { ZoneActivity } from '../../zone-activity/entities/zone-activity.entity';
import { Mahallu } from '../../mahallu/entities/mahallu.entity';
import { Village } from '../../village/entities/village.entity';
import { Zone } from '../../zone/entities/zone.entity';
import { District } from '../../district/entities/district.entity';
import { NotificationActivity } from '../../notification-activity/entities/notification-activity.entity';
import { DonationActivity } from '../../donation-activity/entities/donation-activity.entity';

@ObjectType()
export class Credential {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field((type) => RoleEnum, { nullable: true })
  role?: RoleEnum;

  @Field(() => Int, { nullable: true })
  mahalluId?: number;

  @Field(() => Mahallu, { nullable: true })
  mahallu?: Mahallu;

  @Field(() => Int, { nullable: true })
  villageId?: number;

  @Field(() => Village, { nullable: true })
  village?: Village;

  @Field(() => Int, { nullable: true })
  zoneId?: number;

  @Field(() => Zone, { nullable: true })
  zone?: Zone;

  @Field(() => Int, { nullable: true })
  districtId?: number;

  @Field(() => District, { nullable: true })
  district?: District;

  @Field(() => [MahalluActivity], { nullable: true })
  mahalluActivities?: MahalluActivity[];

  @Field(() => [PostActivity], { nullable: true })
  postActivities?: PostActivity[];

  @Field(() => [JobActivity], { nullable: true })
  jobActivities?: JobActivity[];

  @Field(() => [CharityActivity], { nullable: true })
  charityActivities?: CharityActivity[];

  @Field(() => [FamilyActivity], { nullable: true })
  familyActivities?: FamilyActivity[];

  @Field(() => [MemberActivity], { nullable: true })
  memberActivities?: MemberActivity[];

  @Field(() => [AccountActivity], { nullable: true })
  accountActivities?: AccountActivity[];

  @Field(() => [CommitteeActivity], { nullable: true })
  committeeActivities?: CommitteeActivity[];

  @Field(() => [EventActivity], { nullable: true })
  eventActivities?: EventActivity[];

  @Field(() => [CampaignActivity], { nullable: true })
  campaignActivities?: CampaignActivity[];

  @Field(() => [TaskCategoryActivity], { nullable: true })
  taskCategoryActivities?: TaskCategoryActivity[];

  @Field(() => [TaskActivity], { nullable: true })
  taskActivities?: TaskActivity[];

  @Field(() => [OtherProgramActivity], { nullable: true })
  otherProgramActivities?: OtherProgramActivity[];

  @Field(() => [YearActivity], { nullable: true })
  yearActivities?: YearActivity[];

  @Field(() => [BadgeActivity], { nullable: true })
  badgeActivities?: BadgeActivity[];

  @Field(() => [TaskParticipantActivity], { nullable: true })
  taskParticipantActivities?: TaskParticipantActivity[];

  @Field(() => [VillageActivity], { nullable: true })
  villageActivities?: VillageActivity[];

  @Field(() => [ZoneActivity], { nullable: true })
  zoneActivities?: ZoneActivity[];

  @Field(() => [DistrictActivity], { nullable: true })
  districtActivities?: DistrictActivity[];

  @Field(() => [NotificationActivity], { nullable: true })
  notificationActivities?: NotificationActivity[];

  @Field(() => [DonationActivity], { nullable: true })
  donationActivities?: DonationActivity[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
