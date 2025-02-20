-- CreateTable
CREATE TABLE "_TaskSworkers" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TaskSworkers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskSworkers_B_index" ON "_TaskSworkers"("B");

-- AddForeignKey
ALTER TABLE "_TaskSworkers" ADD CONSTRAINT "_TaskSworkers_A_fkey" FOREIGN KEY ("A") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskSworkers" ADD CONSTRAINT "_TaskSworkers_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
