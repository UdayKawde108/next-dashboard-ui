/*
  Warnings:

  - You are about to drop the `_SmasterToSworker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SmasterToSworker" DROP CONSTRAINT "_SmasterToSworker_A_fkey";

-- DropForeignKey
ALTER TABLE "_SmasterToSworker" DROP CONSTRAINT "_SmasterToSworker_B_fkey";

-- DropTable
DROP TABLE "_SmasterToSworker";

-- CreateTable
CREATE TABLE "Bin" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "level" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL,
    "areaId" INTEGER,
    "smasterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinSworker" (
    "binId" TEXT NOT NULL,
    "sworkerId" TEXT NOT NULL,

    CONSTRAINT "BinSworker_pkey" PRIMARY KEY ("binId","sworkerId")
);

-- CreateTable
CREATE TABLE "_BinSworker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BinSworker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BinSworker_B_index" ON "_BinSworker"("B");

-- AddForeignKey
ALTER TABLE "Bin" ADD CONSTRAINT "Bin_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bin" ADD CONSTRAINT "Bin_smasterId_fkey" FOREIGN KEY ("smasterId") REFERENCES "Smaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinSworker" ADD CONSTRAINT "BinSworker_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinSworker" ADD CONSTRAINT "BinSworker_sworkerId_fkey" FOREIGN KEY ("sworkerId") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BinSworker" ADD CONSTRAINT "_BinSworker_A_fkey" FOREIGN KEY ("A") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BinSworker" ADD CONSTRAINT "_BinSworker_B_fkey" FOREIGN KEY ("B") REFERENCES "Sworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
