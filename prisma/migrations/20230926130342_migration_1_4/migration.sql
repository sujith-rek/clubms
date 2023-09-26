/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Eventapproval` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Eventapproval_eventId_key" ON "Eventapproval"("eventId");
