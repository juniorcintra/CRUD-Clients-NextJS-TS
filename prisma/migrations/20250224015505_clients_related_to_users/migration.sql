/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "client" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "client_userId_key" ON "client"("userId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
