-- CreateEnum
CREATE TYPE "FatwaStatus" AS ENUM ('PENDING', 'ANSWERED', 'REJECTED');

-- CreateTable
CREATE TABLE "Fatwa" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionerMobile" TEXT NOT NULL,
    "askedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" TEXT,
    "answeredById" INTEGER,
    "answeredAt" TIMESTAMP(3),
    "status" "FatwaStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fatwa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fatwa" ADD CONSTRAINT "Fatwa_answeredById_fkey" FOREIGN KEY ("answeredById") REFERENCES "Credential"("id") ON DELETE SET NULL ON UPDATE CASCADE;
