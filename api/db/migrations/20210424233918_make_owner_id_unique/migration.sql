/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[ownerId]` on the table `Restaurant`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant.ownerId_unique" ON "Restaurant"("ownerId");
