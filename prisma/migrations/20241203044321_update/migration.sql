/*
  Warnings:

  - The values [APPROVE] on the enum `ActionEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActionEnum_new" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'VERIFY', 'CLAIM', 'REJECT', 'ADD_REMARKS');
ALTER TABLE "MahalluActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "PostActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "JobActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "CharityActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "FamilyActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "MemberActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "AccountActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "CommitteeActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "EventActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "CampaignActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "TaskCategoryActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "TaskActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "OtherProgramActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "YearActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "BadgeActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "TaskParticipantActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "VillageActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "ZoneActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "DistrictActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "NotificationActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TABLE "DonationActivity" ALTER COLUMN "action" TYPE "ActionEnum_new" USING ("action"::text::"ActionEnum_new");
ALTER TYPE "ActionEnum" RENAME TO "ActionEnum_old";
ALTER TYPE "ActionEnum_new" RENAME TO "ActionEnum";
DROP TYPE "ActionEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "AccountActivity" DROP CONSTRAINT "AccountActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "AccountActivity" DROP CONSTRAINT "AccountActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_yearId_fkey";

-- DropForeignKey
ALTER TABLE "BadgeActivity" DROP CONSTRAINT "BadgeActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "BadgeActivity" DROP CONSTRAINT "BadgeActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_yearId_fkey";

-- DropForeignKey
ALTER TABLE "CampaignActivity" DROP CONSTRAINT "CampaignActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "CampaignActivity" DROP CONSTRAINT "CampaignActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Charity" DROP CONSTRAINT "Charity_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "CharityActivity" DROP CONSTRAINT "CharityActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "CharityActivity" DROP CONSTRAINT "CharityActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_districtId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_villageId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_zoneId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_charityId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "DonationActivity" DROP CONSTRAINT "DonationActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "DonationActivity" DROP CONSTRAINT "DonationActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "EventActivity" DROP CONSTRAINT "EventActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "EventActivity" DROP CONSTRAINT "EventActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyActivity" DROP CONSTRAINT "FamilyActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyActivity" DROP CONSTRAINT "FamilyActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "JobActivity" DROP CONSTRAINT "JobActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "JobActivity" DROP CONSTRAINT "JobActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Mahallu" DROP CONSTRAINT "Mahallu_villageId_fkey";

-- DropForeignKey
ALTER TABLE "MahalluActivity" DROP CONSTRAINT "MahalluActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "MahalluActivity" DROP CONSTRAINT "MahalluActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_familyId_fkey";

-- DropForeignKey
ALTER TABLE "MemberActivity" DROP CONSTRAINT "MemberActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "MemberActivity" DROP CONSTRAINT "MemberActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationActivity" DROP CONSTRAINT "NotificationActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationActivity" DROP CONSTRAINT "NotificationActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "OtherProgram" DROP CONSTRAINT "OtherProgram_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "OtherProgram" DROP CONSTRAINT "OtherProgram_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "OtherProgramActivity" DROP CONSTRAINT "OtherProgramActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "OtherProgramActivity" DROP CONSTRAINT "OtherProgramActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Committee" DROP CONSTRAINT "Committee_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "Committee" DROP CONSTRAINT "Committee_memberId_fkey";

-- DropForeignKey
ALTER TABLE "CommitteeActivity" DROP CONSTRAINT "CommitteeActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "CommitteeActivity" DROP CONSTRAINT "CommitteeActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "PostActivity" DROP CONSTRAINT "PostActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "PostActivity" DROP CONSTRAINT "PostActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "PostInteraction" DROP CONSTRAINT "PostInteraction_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "PostInteraction" DROP CONSTRAINT "PostInteraction_postId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_yearId_fkey";

-- DropForeignKey
ALTER TABLE "TaskActivity" DROP CONSTRAINT "TaskActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "TaskActivity" DROP CONSTRAINT "TaskActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCategoryActivity" DROP CONSTRAINT "TaskCategoryActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCategoryActivity" DROP CONSTRAINT "TaskCategoryActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "TaskParticipant" DROP CONSTRAINT "TaskParticipant_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "TaskParticipant" DROP CONSTRAINT "TaskParticipant_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskParticipantActivity" DROP CONSTRAINT "TaskParticipantActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "TaskParticipantActivity" DROP CONSTRAINT "TaskParticipantActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_zoneId_fkey";

-- DropForeignKey
ALTER TABLE "VillageActivity" DROP CONSTRAINT "VillageActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "VillageActivity" DROP CONSTRAINT "VillageActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "YearActivity" DROP CONSTRAINT "YearActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "YearActivity" DROP CONSTRAINT "YearActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "ZoneActivity" DROP CONSTRAINT "ZoneActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "ZoneActivity" DROP CONSTRAINT "ZoneActivity_targetId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AccountActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Badge" ALTER COLUMN "yearId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BadgeActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "yearId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CampaignActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CharityActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DistrictActivity" ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "charityId" DROP NOT NULL,
ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DonationActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "EventActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "mahalluId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Family" ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FamilyActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "mahalluId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "JobActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mahallu" ALTER COLUMN "villageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MahalluActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MemberActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "NotificationActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OtherProgram" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "mahalluId" DROP NOT NULL,
ALTER COLUMN "points" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OtherProgramActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Committee" ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CommitteeActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostInteraction" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "yearId" DROP NOT NULL,
ALTER COLUMN "points" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskCategoryActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskParticipant" ALTER COLUMN "taskId" DROP NOT NULL,
ALTER COLUMN "mahalluId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskParticipantActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Village" ALTER COLUMN "zoneId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VillageActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "YearActivity" ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "targetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Zone" ALTER COLUMN "districtId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ZoneActivity" ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "actorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahallu" ADD CONSTRAINT "Mahallu_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charity" ADD CONSTRAINT "Charity_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "Charity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipant" ADD CONSTRAINT "TaskParticipant_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipant" ADD CONSTRAINT "TaskParticipant_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgram" ADD CONSTRAINT "OtherProgram_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgram" ADD CONSTRAINT "OtherProgram_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MahalluActivity" ADD CONSTRAINT "MahalluActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MahalluActivity" ADD CONSTRAINT "MahalluActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActivity" ADD CONSTRAINT "PostActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActivity" ADD CONSTRAINT "PostActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityActivity" ADD CONSTRAINT "CharityActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Charity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityActivity" ADD CONSTRAINT "CharityActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberActivity" ADD CONSTRAINT "MemberActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberActivity" ADD CONSTRAINT "MemberActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeActivity" ADD CONSTRAINT "CommitteeActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeActivity" ADD CONSTRAINT "CommitteeActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventActivity" ADD CONSTRAINT "EventActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventActivity" ADD CONSTRAINT "EventActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategoryActivity" ADD CONSTRAINT "TaskCategoryActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategoryActivity" ADD CONSTRAINT "TaskCategoryActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskActivity" ADD CONSTRAINT "TaskActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskActivity" ADD CONSTRAINT "TaskActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgramActivity" ADD CONSTRAINT "OtherProgramActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "OtherProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgramActivity" ADD CONSTRAINT "OtherProgramActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearActivity" ADD CONSTRAINT "YearActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearActivity" ADD CONSTRAINT "YearActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeActivity" ADD CONSTRAINT "BadgeActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeActivity" ADD CONSTRAINT "BadgeActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipantActivity" ADD CONSTRAINT "TaskParticipantActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "TaskParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipantActivity" ADD CONSTRAINT "TaskParticipantActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageActivity" ADD CONSTRAINT "VillageActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageActivity" ADD CONSTRAINT "VillageActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZoneActivity" ADD CONSTRAINT "ZoneActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZoneActivity" ADD CONSTRAINT "ZoneActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationActivity" ADD CONSTRAINT "NotificationActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationActivity" ADD CONSTRAINT "NotificationActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationActivity" ADD CONSTRAINT "DonationActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationActivity" ADD CONSTRAINT "DonationActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
