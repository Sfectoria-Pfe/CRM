/*
  Warnings:

  - You are about to alter the column `telephone_vendeur` on the `location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `location` MODIFY `telephone_vendeur` INTEGER NOT NULL;
