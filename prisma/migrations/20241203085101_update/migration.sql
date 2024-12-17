-- CreateTable
CREATE TABLE "_NotificationVillage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationVillage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NotificationZone" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationZone_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NotificationDistrict" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationDistrict_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NotificationVillage_B_index" ON "_NotificationVillage"("B");

-- CreateIndex
CREATE INDEX "_NotificationZone_B_index" ON "_NotificationZone"("B");

-- CreateIndex
CREATE INDEX "_NotificationDistrict_B_index" ON "_NotificationDistrict"("B");

-- AddForeignKey
ALTER TABLE "_NotificationVillage" ADD CONSTRAINT "_NotificationVillage_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationVillage" ADD CONSTRAINT "_NotificationVillage_B_fkey" FOREIGN KEY ("B") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationZone" ADD CONSTRAINT "_NotificationZone_A_fkey" FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationZone" ADD CONSTRAINT "_NotificationZone_B_fkey" FOREIGN KEY ("B") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationDistrict" ADD CONSTRAINT "_NotificationDistrict_A_fkey" FOREIGN KEY ("A") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationDistrict" ADD CONSTRAINT "_NotificationDistrict_B_fkey" FOREIGN KEY ("B") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
