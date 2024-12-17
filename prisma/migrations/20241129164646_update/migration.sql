/*
  Warnings:

  - You are about to drop the column `district` on the `Mahallu` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Mahallu` table. All the data in the column will be lost.
  - Added the required column `villageId` to the `Mahallu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mahallu" DROP COLUMN "district",
DROP COLUMN "state",
ADD COLUMN     "villageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Village" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zoneId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskParticipantActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskParticipantActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VillageActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZoneActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZoneActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistrictActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DistrictActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mahallu" ADD CONSTRAINT "Mahallu_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipantActivity" ADD CONSTRAINT "TaskParticipantActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "TaskParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskParticipantActivity" ADD CONSTRAINT "TaskParticipantActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageActivity" ADD CONSTRAINT "VillageActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageActivity" ADD CONSTRAINT "VillageActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZoneActivity" ADD CONSTRAINT "ZoneActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZoneActivity" ADD CONSTRAINT "ZoneActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictActivity" ADD CONSTRAINT "DistrictActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictActivity" ADD CONSTRAINT "DistrictActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
