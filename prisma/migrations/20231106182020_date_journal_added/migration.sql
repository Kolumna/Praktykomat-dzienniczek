/*
  Warnings:

  - Added the required column `date` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
