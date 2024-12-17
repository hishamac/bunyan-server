/*
  Warnings:

  - You are about to drop the column `createById` on the `Family` table. All the data in the column will be lost.
  - Added the required column `houseHolder` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `houseType` on the `Family` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rationCardType` on the `Family` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_mahalluId_fkey";

-- AlterTable
ALTER TABLE "Family" DROP COLUMN "createById",
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "houseHolder" TEXT NOT NULL,
DROP COLUMN "houseType",
ADD COLUMN     "houseType" "HouseTypeEnum" NOT NULL,
DROP COLUMN "rationCardType",
ADD COLUMN     "rationCardType" "RationCardTypeEnum" NOT NULL;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_mahalluId_fkey" FOREIGN KEY ("mahalluId") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyActivity" ADD CONSTRAINT "FamilyActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;
