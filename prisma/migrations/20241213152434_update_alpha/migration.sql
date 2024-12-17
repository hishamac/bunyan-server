/*
  Warnings:

  - You are about to drop the column `yearlyCleared` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyCleared` on the `TaskCategory` table. All the data in the column will be lost.
  - You are about to drop the `_NotificationDistrict` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NotificationMahallu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NotificationVillage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NotificationZone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NotificationDistrict" DROP CONSTRAINT "_NotificationDistrict_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationDistrict" DROP CONSTRAINT "_NotificationDistrict_B_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationMahallu" DROP CONSTRAINT "_NotificationMahallu_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationMahallu" DROP CONSTRAINT "_NotificationMahallu_B_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationVillage" DROP CONSTRAINT "_NotificationVillage_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationVillage" DROP CONSTRAINT "_NotificationVillage_B_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationZone" DROP CONSTRAINT "_NotificationZone_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationZone" DROP CONSTRAINT "_NotificationZone_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "yearlyCleared";

-- AlterTable
ALTER TABLE "TaskCategory" DROP COLUMN "yearlyCleared";

-- DropTable
DROP TABLE "_NotificationDistrict";

-- DropTable
DROP TABLE "_NotificationMahallu";

-- DropTable
DROP TABLE "_NotificationVillage";

-- DropTable
DROP TABLE "_NotificationZone";

-- CreateTable
CREATE TABLE "_NotificationCredential" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationCredential_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NotificationCredential_B_index" ON "_NotificationCredential"("B");

-- AddForeignKey
ALTER TABLE "_NotificationCredential" ADD CONSTRAINT "_NotificationCredential_A_fkey" FOREIGN KEY ("A") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationCredential" ADD CONSTRAINT "_NotificationCredential_B_fkey" FOREIGN KEY ("B") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
