-- CreateEnum
CREATE TYPE "InteractionEnum" AS ENUM ('LIKE', 'VIEW');

-- CreateEnum
CREATE TYPE "ActionEnum" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'APPROVE');

-- CreateEnum
CREATE TYPE "EmploymentTypeEnum" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN');

-- CreateEnum
CREATE TYPE "LocationTypeEnum" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'REVIEWED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DonationStatusEnum" AS ENUM ('FAILED', 'SUCCESS');

-- CreateEnum
CREATE TYPE "RationCardTypeEnum" AS ENUM ('APL', 'BPL');

-- CreateEnum
CREATE TYPE "HouseTypeEnum" AS ENUM ('OWN', 'RENT');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MarriageStatusEnum" AS ENUM ('MARRIED', 'UNMARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED');

-- CreateEnum
CREATE TYPE "PermissionTypesEnum" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "CategoryTypeEnum" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "YearTypeEnum" AS ENUM ('CURRENT', 'PAST', 'ALL');

-- CreateTable
CREATE TABLE "Mahallu" (
    "id" SERIAL NOT NULL,
    "regNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "postOffice" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahallu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MahalluActivity" (
    "id" SERIAL NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MahalluActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileURL" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostActivity" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostInteraction" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "mahalluId" INTEGER,
    "guest" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "employmentType" "EmploymentTypeEnum" NOT NULL,
    "locationType" "LocationTypeEnum" NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "mahalluId" INTEGER,
    "skills" TEXT[],
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobActivities" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charity" (
    "id" SERIAL NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mahalluId" INTEGER,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "startingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "target" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Charity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharityActivity" (
    "id" SERIAL NOT NULL,
    "charityId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharityActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "guest" BOOLEAN NOT NULL,
    "memberId" INTEGER,
    "charityId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "status" "DonationStatusEnum" NOT NULL,
    "donatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "block" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "houseHolder" TEXT NOT NULL,
    "houseName" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "place" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "houseType" "HouseTypeEnum" NOT NULL,
    "rationCardType" "RationCardTypeEnum" NOT NULL,
    "panchayathMunicipality" TEXT NOT NULL,
    "panchayathWardNo" TEXT NOT NULL,
    "wardHouseNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyActivity" (
    "id" SERIAL NOT NULL,
    "familyId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "registerNo" TEXT NOT NULL,
    "familyId" INTEGER,
    "contact" INTEGER,
    "name" TEXT NOT NULL,
    "relationToHouseHolder" TEXT,
    "gender" "GenderEnum" NOT NULL,
    "bloodGroup" TEXT,
    "yearOfBirth" TIMESTAMP(3),
    "healthCondition" TEXT,
    "maritalStatus" "MarriageStatusEnum",
    "job" TEXT,
    "jobSector" TEXT,
    "abroad" BOOLEAN DEFAULT false,
    "abroadPlace" TEXT,
    "skills" TEXT[],
    "orphan" BOOLEAN DEFAULT false,
    "islamicQualification" TEXT,
    "generalQualification" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberActivity" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL,
    "mahalluIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialActivity" (
    "id" SERIAL NOT NULL,
    "credentialId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CredentialActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialMahallu" (
    "id" SERIAL NOT NULL,
    "credentialId" INTEGER NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CredentialMahallu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountActivity" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "type" "CategoryTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "receivedBy" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "paidBy" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeActivity" (
    "id" SERIAL NOT NULL,
    "committeeId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteeActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "posterURL" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "mahalluId" INTEGER,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "endingDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventActivity" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationMahallu" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationMahallu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "mahalluIds" INTEGER[],
    "link" TEXT,
    "buttonName" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileURL" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "yearId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignActivity" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "yearlyCleared" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCategoryActivity" (
    "id" SERIAL NOT NULL,
    "taskCategoryId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCategoryActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "campaignId" INTEGER,
    "yearId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "points" INTEGER NOT NULL,
    "icon" TEXT,
    "yearlyCleared" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskParticipant" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "files" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskActivity" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherProgram" (
    "id" SERIAL NOT NULL,
    "files" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mahalluId" INTEGER NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtherProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherProgramActivity" (
    "id" SERIAL NOT NULL,
    "otherProgramId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherProgramActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "YearTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearActivity" (
    "id" SERIAL NOT NULL,
    "yearId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YearActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeActivity" (
    "id" SERIAL NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Committee_memberId_key" ON "Committee"("memberId");

-- AddForeignKey
ALTER TABLE "MahalluActivity" ADD CONSTRAINT "MahalluActivity_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActivity" ADD CONSTRAINT "PostActivity_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivities" ADD CONSTRAINT "JobActivities_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charity" ADD CONSTRAINT "Charity_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharityActivity" ADD CONSTRAINT "CharityActivity_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "Charity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "Charity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberActivity" ADD CONSTRAINT "MemberActivity_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialActivity" ADD CONSTRAINT "CredentialActivity_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMahallu" ADD CONSTRAINT "CredentialMahallu_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMahallu" ADD CONSTRAINT "CredentialMahallu_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountActivity" ADD CONSTRAINT "AccountActivity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeActivity" ADD CONSTRAINT "CommitteeActivity_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventActivity" ADD CONSTRAINT "EventActivity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationMahallu" ADD CONSTRAINT "NotificationMahallu_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationMahallu" ADD CONSTRAINT "NotificationMahallu_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategoryActivity" ADD CONSTRAINT "TaskCategoryActivity_taskCategoryId_fkey" FOREIGN KEY ("taskCategoryId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipant" ADD CONSTRAINT "TaskParticipant_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipant" ADD CONSTRAINT "TaskParticipant_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskActivity" ADD CONSTRAINT "TaskActivity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgram" ADD CONSTRAINT "OtherProgram_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgram" ADD CONSTRAINT "OtherProgram_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherProgramActivity" ADD CONSTRAINT "OtherProgramActivity_otherProgramId_fkey" FOREIGN KEY ("otherProgramId") REFERENCES "OtherProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearActivity" ADD CONSTRAINT "YearActivity_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeActivity" ADD CONSTRAINT "BadgeActivity_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
