/*
  Warnings:

  - You are about to drop the column `prix_unitaire` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `devis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `devis` DROP COLUMN `prix_unitaire`,
    DROP COLUMN `service`;

-- CreateTable
CREATE TABLE `DevisLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `prix_unitaire` DOUBLE NOT NULL,
    `qunatity` INTEGER NOT NULL,
    `devisId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DevisLine` ADD CONSTRAINT `DevisLine_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DevisLine` ADD CONSTRAINT `DevisLine_devisId_fkey` FOREIGN KEY (`devisId`) REFERENCES `devis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
