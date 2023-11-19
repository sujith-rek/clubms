/*
  Warnings:

  - You are about to drop the column `date` on the `RoomBookApproval` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CC` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CC';

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Eventapproval" DROP CONSTRAINT "Eventapproval_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Eventapproval" DROP CONSTRAINT "Eventapproval_ccId_fkey";

-- DropForeignKey
ALTER TABLE "RoomBookApproval" DROP CONSTRAINT "RoomBookApproval_adminId_fkey";

-- DropForeignKey
ALTER TABLE "RoomBookApproval" DROP CONSTRAINT "RoomBookApproval_clubId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Eventapproval" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "RoomBookApproval" DROP COLUMN "date",
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "CC";

-- DropTable
DROP TABLE "Club";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "rollNo" TEXT NOT NULL DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubBudget" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL DEFAULT 1,
    "allocated" INTEGER NOT NULL,
    "spent" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER,

    CONSTRAINT "ClubBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetApproval" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL DEFAULT 1,
    "adminStatus" "Status" NOT NULL DEFAULT 'PENDING',
    "clubId" INTEGER NOT NULL DEFAULT 1,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedDate" TIMESTAMP(3),
    "adminRemarks" TEXT,

    CONSTRAINT "BudgetApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClubBudget_clubId_key" ON "ClubBudget"("clubId");

-- AddForeignKey
ALTER TABLE "ClubBudget" ADD CONSTRAINT "ClubBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventapproval" ADD CONSTRAINT "Eventapproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBookApproval" ADD CONSTRAINT "RoomBookApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetApproval" ADD CONSTRAINT "BudgetApproval_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "ClubBudget"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;
