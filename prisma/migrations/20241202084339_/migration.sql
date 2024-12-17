-- DropForeignKey
ALTER TABLE "DistrictActivity" DROP CONSTRAINT "DistrictActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "DistrictActivity" DROP CONSTRAINT "DistrictActivity_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_districtId_fkey";

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictActivity" ADD CONSTRAINT "DistrictActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictActivity" ADD CONSTRAINT "DistrictActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
