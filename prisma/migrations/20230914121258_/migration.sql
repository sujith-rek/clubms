/*
  Warnings:

  - You are about to drop the column `status` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Eventapproval` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Eventapproval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ccId` to the `Eventapproval` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Eventapproval" DROP COLUMN "status",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "adminStatus" "Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "ccId" INTEGER NOT NULL,
ADD COLUMN     "clubStatus" "Status" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "EventStatus";

-- DropEnum
DROP TYPE "RoomBookingStatus";

-- CreateTable
CREATE TABLE "CC" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "CC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CC_email_key" ON "CC"("email");

-- AddForeignKey
ALTER TABLE "Eventapproval" ADD CONSTRAINT "Eventapproval_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventapproval" ADD CONSTRAINT "Eventapproval_ccId_fkey" FOREIGN KEY ("ccId") REFERENCES "CC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
