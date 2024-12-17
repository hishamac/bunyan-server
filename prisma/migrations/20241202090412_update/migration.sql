/*
  Warnings:

  - You are about to drop the `CredentialActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CredentialActivity" DROP CONSTRAINT "CredentialActivity_actorId_fkey";

-- DropForeignKey
ALTER TABLE "CredentialActivity" DROP CONSTRAINT "CredentialActivity_targetId_fkey";

-- DropTable
DROP TABLE "CredentialActivity";

-- CreateTable
CREATE TABLE "DonationActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DonationActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationActivity" ADD CONSTRAINT "DonationActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationActivity" ADD CONSTRAINT "DonationActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
