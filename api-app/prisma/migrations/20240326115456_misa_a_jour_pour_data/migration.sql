/*
  Warnings:

  - You are about to drop the column `stageId` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the `stage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `opportunite` DROP FOREIGN KEY `Opportunite_stageId_fkey`;

-- AlterTable
ALTER TABLE `opportunite` DROP COLUMN `stageId`;

-- DropTable
DROP TABLE `stage`;
