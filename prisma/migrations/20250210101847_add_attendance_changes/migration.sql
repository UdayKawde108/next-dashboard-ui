/*
  Warnings:

  - Made the column `sworkerId` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "sworkerId" SET NOT NULL,
ALTER COLUMN "present" SET DEFAULT true;
