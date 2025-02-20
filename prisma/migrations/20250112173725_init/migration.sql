/*
  Warnings:

  - The primary key for the `Smaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_AreaToSmaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_SmasterToSworker` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_smasterId_fkey";

-- DropForeignKey
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_B_fkey";

-- DropForeignKey
ALTER TABLE "_SmasterToSworker" DROP CONSTRAINT "_SmasterToSworker_A_fkey";

-- AlterTable
ALTER TABLE "Smaster" DROP CONSTRAINT "Smaster_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Smaster_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Smaster_id_seq";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "smasterId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_AreaToSmaster" DROP CONSTRAINT "_AreaToSmaster_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AreaToSmaster_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_SmasterToSworker" DROP CONSTRAINT "_SmasterToSworker_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_SmasterToSworker_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_smasterId_fkey" FOREIGN KEY ("smasterId") REFERENCES "Smaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SmasterToSworker" ADD CONSTRAINT "_SmasterToSworker_A_fkey" FOREIGN KEY ("A") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToSmaster" ADD CONSTRAINT "_AreaToSmaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
