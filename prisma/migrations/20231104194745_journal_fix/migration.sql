/*
  Warnings:

  - You are about to drop the column `content` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Journal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "content",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "journalId" TEXT NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
