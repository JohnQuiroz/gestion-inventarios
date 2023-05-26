/*
  Warnings:

  - You are about to drop the column `in` on the `Movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "in",
ADD COLUMN     "entry" INTEGER NOT NULL DEFAULT 0;
