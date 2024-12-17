/*
  Warnings:

  - You are about to drop the column `accountId` on the `AccountActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `AccountActivity` table. All the data in the column will be lost.
  - You are about to drop the column `badgeId` on the `BadgeActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `BadgeActivity` table. All the data in the column will be lost.
  - You are about to drop the column `campaignId` on the `CampaignActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `CampaignActivity` table. All the data in the column will be lost.
  - You are about to drop the column `charityId` on the `CharityActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `CharityActivity` table. All the data in the column will be lost.
  - You are about to drop the column `credentialId` on the `CredentialActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `CredentialActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `EventActivity` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `EventActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `FamilyActivity` table. All the data in the column will be lost.
  - You are about to drop the column `familyId` on the `FamilyActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `MahalluActivity` table. All the data in the column will be lost.
  - You are about to drop the column `mahalluId` on the `MahalluActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `MemberActivity` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `MemberActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `OtherProgramActivity` table. All the data in the column will be lost.
  - You are about to drop the column `otherProgramId` on the `OtherProgramActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `CommitteeActivity` table. All the data in the column will be lost.
  - You are about to drop the column `committeeId` on the `CommitteeActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `PostActivity` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `TaskActivity` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `TaskActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `TaskCategoryActivity` table. All the data in the column will be lost.
  - You are about to drop the column `taskCategoryId` on the `TaskCategoryActivity` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `YearActivity` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `YearActivity` table. All the data in the column will be lost.
  - You are about to drop the `JobActivities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actorId` to the `AccountActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `AccountActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `AccountActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `BadgeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `BadgeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `BadgeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `CampaignActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `CampaignActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `CampaignActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `CharityActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `CharityActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `CharityActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `CredentialActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `CredentialActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `CredentialActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `EventActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `EventActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `EventActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `FamilyActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `FamilyActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `FamilyActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `MahalluActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `MahalluActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `MahalluActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `MemberActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `MemberActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `MemberActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `OtherProgramActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `OtherProgramActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `OtherProgramActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `CommitteeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `CommitteeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `CommitteeActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `PostActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `PostActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `PostActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `TaskActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `TaskActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `TaskActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `TaskCategoryActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `TaskCategoryActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `TaskCategoryActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `YearActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `YearActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `YearActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountActivity" DROP CONSTRAINT "AccountActivity_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BadgeActivity" DROP CONSTRAINT "BadgeActivity_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "CampaignActivity" DROP CONSTRAINT "CampaignActivity_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "CharityActivity" DROP CONSTRAINT "CharityActivity_charityId_fkey";

-- DropForeignKey
ALTER TABLE "CredentialActivity" DROP CONSTRAINT "CredentialActivity_credentialId_fkey";

-- DropForeignKey
ALTER TABLE "EventActivity" DROP CONSTRAINT "EventActivity_eventId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyActivity" DROP CONSTRAINT "FamilyActivity_familyId_fkey";

-- DropForeignKey
ALTER TABLE "JobActivities" DROP CONSTRAINT "JobActivities_jobId_fkey";

-- DropForeignKey
ALTER TABLE "MahalluActivity" DROP CONSTRAINT "MahalluActivity_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "MemberActivity" DROP CONSTRAINT "MemberActivity_memberId_fkey";

-- DropForeignKey
ALTER TABLE "OtherProgramActivity" DROP CONSTRAINT "OtherProgramActivity_otherProgramId_fkey";

-- DropForeignKey
ALTER TABLE "CommitteeActivity" DROP CONSTRAINT "CommitteeActivity_committeeId_fkey";

-- DropForeignKey
ALTER TABLE "PostActivity" DROP CONSTRAINT "PostActivity_postId_fkey";

-- DropForeignKey
ALTER TABLE "TaskActivity" DROP CONSTRAINT "TaskActivity_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCategoryActivity" DROP CONSTRAINT "TaskCategoryActivity_taskCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "YearActivity" DROP CONSTRAINT "YearActivity_yearId_fkey";

-- AlterTable
ALTER TABLE "AccountActivity" DROP COLUMN "accountId",
DROP COLUMN "details",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BadgeActivity" DROP COLUMN "badgeId",
DROP COLUMN "details",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CampaignActivity" DROP COLUMN "campaignId",
DROP COLUMN "details",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CharityActivity" DROP COLUMN "charityId",
DROP COLUMN "details",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CredentialActivity" DROP COLUMN "credentialId",
DROP COLUMN "details",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventActivity" DROP COLUMN "details",
DROP COLUMN "eventId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FamilyActivity" DROP COLUMN "details",
DROP COLUMN "familyId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MahalluActivity" DROP COLUMN "details",
DROP COLUMN "mahalluId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MemberActivity" DROP COLUMN "details",
DROP COLUMN "memberId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OtherProgramActivity" DROP COLUMN "details",
DROP COLUMN "otherProgramId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CommitteeActivity" DROP COLUMN "details",
DROP COLUMN "committeeId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PostActivity" DROP COLUMN "details",
DROP COLUMN "postId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TaskActivity" DROP COLUMN "details",
DROP COLUMN "taskId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TaskCategoryActivity" DROP COLUMN "details",
DROP COLUMN "taskCategoryId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "YearActivity" DROP COLUMN "details",
DROP COLUMN "yearId",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "targetId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "JobActivities";

-- CreateTable
CREATE TABLE "JobActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MahalluActivity" ADD CONSTRAINT "MahalluActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MahalluActivity" ADD CONSTRAINT "MahalluActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActivity" ADD CONSTRAINT "PostActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActivity" ADD CONSTRAINT "PostActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityActivity" ADD CONSTRAINT "CharityActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Charity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityActivity" ADD CONSTRAINT "CharityActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberActivity" ADD CONSTRAINT "MemberActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberActivity" ADD CONSTRAINT "MemberActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialActivity" ADD CONSTRAINT "CredentialActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialActivity" ADD CONSTRAINT "CredentialActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeActivity" ADD CONSTRAINT "CommitteeActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeActivity" ADD CONSTRAINT "CommitteeActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventActivity" ADD CONSTRAINT "EventActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventActivity" ADD CONSTRAINT "EventActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategoryActivity" ADD CONSTRAINT "TaskCategoryActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategoryActivity" ADD CONSTRAINT "TaskCategoryActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskActivity" ADD CONSTRAINT "TaskActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskActivity" ADD CONSTRAINT "TaskActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgramActivity" ADD CONSTRAINT "OtherProgramActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "OtherProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgramActivity" ADD CONSTRAINT "OtherProgramActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearActivity" ADD CONSTRAINT "YearActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearActivity" ADD CONSTRAINT "YearActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeActivity" ADD CONSTRAINT "BadgeActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeActivity" ADD CONSTRAINT "BadgeActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
