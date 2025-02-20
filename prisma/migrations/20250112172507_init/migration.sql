/*
  Warnings:

  - The primary key for the `Smaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Smaster` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_AreaToSmaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `smasterId` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_AreaToSmaster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_smasterId_fkey";

-- DropForeignKey
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_B_fkey";

-- AlterTable
ALTER TABLE "Smaster" DROP CONSTRAINT "Smaster_pkey",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Smaster_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "smasterId",
ADD COLUMN     "smasterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_AreaToSmaster_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateTable
CREATE TABLE "_SmasterToSworker" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SmasterToSworker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SmasterToSworker_B_index" ON "_SmasterToSworker"("B");

-- CreateIndex
CREATE INDEX "_AreaToSmaster_B_index" ON "_AreaToSmaster"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_smasterId_fkey" FOREIGN KEY ("smasterId") REFERENCES "Smaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SmasterToSworker" ADD CONSTRAINT "_SmasterToSworker_A_fkey" FOREIGN KEY ("A") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SmasterToSworker" ADD CONSTRAINT "_SmasterToSworker_B_fkey" FOREIGN KEY ("B") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToSmaster" ADD CONSTRAINT "_AreaToSmaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
