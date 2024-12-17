-- DropForeignKey
ALTER TABLE "DistrictActivity" DROP CONSTRAINT "DistrictActivity_targetId_fkey";

-- AddForeignKey
ALTER TABLE "DistrictActivity" ADD CONSTRAINT "DistrictActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;
