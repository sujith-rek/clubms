/*
  Warnings:

  - Added the required column `status` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'CLUB');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "RoomBookingStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Eventapproval" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Eventapproval_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Eventapproval" ADD CONSTRAINT "Eventapproval_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
