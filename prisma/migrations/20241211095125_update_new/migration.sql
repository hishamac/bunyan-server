/*
  Warnings:

  - You are about to drop the column `active` on the `Mahallu` table. All the data in the column will be lost.
  - Added the required column `regNo` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "regNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mahallu" DROP COLUMN "active";
