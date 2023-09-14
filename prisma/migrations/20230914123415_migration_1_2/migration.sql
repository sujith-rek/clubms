-- AddForeignKey
ALTER TABLE "RoomBookApproval" ADD CONSTRAINT "RoomBookApproval_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
