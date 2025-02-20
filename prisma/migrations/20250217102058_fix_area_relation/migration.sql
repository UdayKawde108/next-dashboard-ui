/*
  Warnings:

  - You are about to drop the `_AreaToSmaster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_areaId_fkey";

-- DropForeignKey
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_A_fkey";

-- DropForeignKey
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_B_fkey";

-- AlterTable
ALTER TABLE "Smaster" ADD COLUMN     "areaId" INTEGER;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "areaId" DROP NOT NULL;

-- DropTable
DROP TABLE "_AreaToSmaster";

-- AddForeignKey
ALTER TABLE "Smaster" ADD CONSTRAINT "Smaster_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
