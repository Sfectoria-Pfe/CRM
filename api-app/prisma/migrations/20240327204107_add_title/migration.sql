/*
  Warnings:

  - Added the required column `stageId` to the `Opportunite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Opportunite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `opportunite` ADD COLUMN `stageId` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Opportunite` ADD CONSTRAINT `Opportunite_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
