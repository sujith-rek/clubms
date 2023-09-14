/*
  Warnings:

  - You are about to drop the column `clubStatus` on the `Eventapproval` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Eventapproval" DROP COLUMN "clubStatus",
ADD COLUMN     "ccStatus" "Status" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "RoomBookApproval" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "adminStatus" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "RoomBookApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roonNumber" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "roomBlock" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomBookApproval" ADD CONSTRAINT "RoomBookApproval_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
