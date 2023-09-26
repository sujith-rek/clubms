/*
  Warnings:

  - Added the required column `description` to the `RoomBookApproval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomBookApproval" ADD COLUMN     "clubId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RoomBookApproval" ADD CONSTRAINT "RoomBookApproval_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
