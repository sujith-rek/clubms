/*
  Warnings:

  - You are about to drop the column `roonNumber` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomNumber` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `roomBlock` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Block" AS ENUM ('A_BLOCK', 'B_BLOCK', 'C_BLOCK', 'D_BLOCK');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roonNumber",
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
DROP COLUMN "roomBlock",
ADD COLUMN     "roomBlock" "Block" NOT NULL;
