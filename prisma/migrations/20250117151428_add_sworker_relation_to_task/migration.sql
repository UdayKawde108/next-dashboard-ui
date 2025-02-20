-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "sworkerId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sworkerId_fkey" FOREIGN KEY ("sworkerId") REFERENCES "Sworker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
