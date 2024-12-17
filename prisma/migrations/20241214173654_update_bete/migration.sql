/*
  Warnings:

  - You are about to drop the column `createdById` on the `Family` table. All the data in the column will be lost.
  - You are about to drop the column `houseHolder` on the `Family` table. All the data in the column will be lost.
  - Changed the type of `houseType` on the `Family` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rationCardType` on the `Family` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_mahalluId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyActivity" DROP CONSTRAINT "FamilyActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_familyId_fkey";

-- AlterTable
ALTER TABLE "Family" DROP COLUMN "createdById",
DROP COLUMN "houseHolder",
ADD COLUMN     "createById" INTEGER,
DROP COLUMN "houseType",
ADD COLUMN     "houseType" TEXT NOT NULL,
DROP COLUMN "rationCardType",
ADD COLUMN     "rationCardType" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
