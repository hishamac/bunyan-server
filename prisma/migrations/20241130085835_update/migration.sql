/*
  Warnings:

  - The values [ADMIN,USER,GUEST] on the enum `RoleEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnum_new" AS ENUM ('SUPER_ADMIN', 'MAHALLU_ADMIN', 'VILLAGE_ADMIN', 'ZONE_ADMIN', 'DISTRICT_ADMIN', 'INFO_ADMIN');
ALTER TABLE "Credential" ALTER COLUMN "role" TYPE "RoleEnum_new" USING ("role"::text::"RoleEnum_new");
ALTER TYPE "RoleEnum" RENAME TO "RoleEnum_old";
ALTER TYPE "RoleEnum_new" RENAME TO "RoleEnum";
DROP TYPE "RoleEnum_old";
COMMIT;

-- CreateTable
CREATE TABLE "NotificationActivity" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "data" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationActivity" ADD CONSTRAINT "NotificationActivity_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationActivity" ADD CONSTRAINT "NotificationActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
