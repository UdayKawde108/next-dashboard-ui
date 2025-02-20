-- CreateTable
CREATE TABLE "_SworkerSmaster" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SworkerSmaster_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SworkerSmaster_B_index" ON "_SworkerSmaster"("B");

-- AddForeignKey
ALTER TABLE "_SworkerSmaster" ADD CONSTRAINT "_SworkerSmaster_A_fkey" FOREIGN KEY ("A") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SworkerSmaster" ADD CONSTRAINT "_SworkerSmaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
