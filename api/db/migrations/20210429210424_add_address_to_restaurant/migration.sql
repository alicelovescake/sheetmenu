/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[address]` on the table `Restaurant`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN "address" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant.address_unique" ON "Restaurant"("address");
