-- AlterEnum
ALTER TYPE "RoleEnum" ADD VALUE 'USER';

-- CreateTable
CREATE TABLE "_MahalluBadge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MahalluBadge_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MahalluBadge_B_index" ON "_MahalluBadge"("B");

-- AddForeignKey
ALTER TABLE "_MahalluBadge" ADD CONSTRAINT "_MahalluBadge_A_fkey" FOREIGN KEY ("A") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MahalluBadge" ADD CONSTRAINT "_MahalluBadge_B_fkey" FOREIGN KEY ("B") REFERENCES "Mahallu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
