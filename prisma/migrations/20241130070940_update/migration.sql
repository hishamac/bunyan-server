/*
  Warnings:

  - You are about to drop the column `mahalluIds` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `mahalluIds` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `CredentialMahallu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationMahallu` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mahalluId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[villageId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zoneId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[districtId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CredentialMahallu" DROP CONSTRAINT "CredentialMahallu_credentialId_fkey";

-- DropForeignKey
ALTER TABLE "CredentialMahallu" DROP CONSTRAINT "CredentialMahallu_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationMahallu" DROP CONSTRAINT "NotificationMahallu_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationMahallu" DROP CONSTRAINT "NotificationMahallu_notificationId_fkey";

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "mahalluIds",
ADD COLUMN     "districtId" INTEGER,
ADD COLUMN     "mahalluId" INTEGER,
ADD COLUMN     "villageId" INTEGER,
ADD COLUMN     "zoneId" INTEGER;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "mahalluIds";

-- DropTable
DROP TABLE "CredentialMahallu";

-- DropTable
DROP TABLE "NotificationMahallu";

-- CreateTable
CREATE TABLE "_NotificationMahallu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationMahallu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NotificationMahallu_B_index" ON "_NotificationMahallu"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_mahalluId_key" ON "Credential"("mahalluId");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_villageId_key" ON "Credential"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_zoneId_key" ON "Credential"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_districtId_key" ON "Credential"("districtId");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationMahallu" ADD CONSTRAINT "_NotificationMahallu_A_fkey" FOREIGN KEY ("A") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationMahallu" ADD CONSTRAINT "_NotificationMahallu_B_fkey" FOREIGN KEY ("B") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
