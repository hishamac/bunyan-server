/*
  Warnings:

  - You are about to drop the column `active` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `buttonName` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `fileURL` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "active",
DROP COLUMN "buttonName",
DROP COLUMN "description",
DROP COLUMN "fileURL",
DROP COLUMN "link",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT true;
