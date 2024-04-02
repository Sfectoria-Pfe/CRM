/*
  Warnings:

  - You are about to drop the column `client` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `commercial` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `date_estimation` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `etiquette` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `probabilite` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `revenus_esperes` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `stageId` on the `opportunite` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `opportunite` table. All the data in the column will be lost.
  - Added the required column `opportuniteId` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `opportunite` DROP FOREIGN KEY `Opportunite_stageId_fkey`;

-- AlterTable
ALTER TABLE `opportunite` DROP COLUMN `client`,
    DROP COLUMN `commercial`,
    DROP COLUMN `date_estimation`,
    DROP COLUMN `email`,
    DROP COLUMN `etiquette`,
    DROP COLUMN `probabilite`,
    DROP COLUMN `revenus_esperes`,
    DROP COLUMN `stageId`,
    DROP COLUMN `tel`;

-- AlterTable
ALTER TABLE `stage` ADD COLUMN `opportuniteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Stage_Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NULL,
    `stageId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_opportuniteId_fkey` FOREIGN KEY (`opportuniteId`) REFERENCES `Opportunite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage_Client` ADD CONSTRAINT `Stage_Client_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage_Client` ADD CONSTRAINT `Stage_Client_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
