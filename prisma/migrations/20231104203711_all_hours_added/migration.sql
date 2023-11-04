/*
  Warnings:

  - Added the required column `allHours` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "allHours" INTEGER NOT NULL;
