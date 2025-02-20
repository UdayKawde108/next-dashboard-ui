/*
  Warnings:

  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `present` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_sworkerId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "present",
ADD COLUMN     "class" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "smasterId" TEXT,
ADD COLUMN     "time" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "sworkerId" DROP NOT NULL,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Attendance_id_seq";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_sworkerId_fkey" FOREIGN KEY ("sworkerId") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_smasterId_fkey" FOREIGN KEY ("smasterId") REFERENCES "Smaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
