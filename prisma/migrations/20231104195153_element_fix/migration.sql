/*
  Warnings:

  - You are about to drop the column `image` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Element` table. All the data in the column will be lost.
  - Added the required column `hours` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "hours" INTEGER NOT NULL;
