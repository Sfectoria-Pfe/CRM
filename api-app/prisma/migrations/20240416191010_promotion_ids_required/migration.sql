/*
  Warnings:

  - Made the column `categorieClientId` on table `promotion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `opportuniteId` on table `promotion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_categorieClientId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_opportuniteId_fkey`;

-- AlterTable
ALTER TABLE `promotion` MODIFY `categorieClientId` INTEGER NOT NULL,
    MODIFY `opportuniteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_categorieClientId_fkey` FOREIGN KEY (`categorieClientId`) REFERENCES `CategorieClient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_opportuniteId_fkey` FOREIGN KEY (`opportuniteId`) REFERENCES `Opportunite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
