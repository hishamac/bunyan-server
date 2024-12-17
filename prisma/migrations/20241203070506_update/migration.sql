/*
  Warnings:

  - You are about to drop the column `status` on the `Charity` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "badgeId" INTEGER;

-- AlterTable
ALTER TABLE "Charity" DROP COLUMN "status",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "badgeId" INTEGER,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
