/*
  Warnings:

  - Added the required column `date_debut` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_fin` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` ADD COLUMN `date_debut` DATETIME(3) NOT NULL,
    ADD COLUMN `date_fin` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `opportuniteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_opportuniteId_fkey` FOREIGN KEY (`opportuniteId`) REFERENCES `Opportunite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
