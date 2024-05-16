/*
  Warnings:

  - You are about to drop the column `createdAt` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `stageclient` ADD COLUMN `win` BOOLEAN NOT NULL DEFAULT false;
