-- AlterTable
ALTER TABLE "Charity" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Committee" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Mahallu" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "createdById" INTEGER;

-- AlterTable
ALTER TABLE "Zone" ADD COLUMN     "createdById" INTEGER;

-- AddForeignKey
ALTER TABLE "Mahallu" ADD CONSTRAINT "Mahallu_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charity" ADD CONSTRAINT "Charity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
