-- CreateTable
CREATE TABLE `Opportunite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `tel` INTEGER NOT NULL,
    `revenus_esperes` DOUBLE NOT NULL,
    `probabilite` DOUBLE NOT NULL,
    `commercial` VARCHAR(191) NOT NULL,
    `date_estimation` DATETIME(3) NOT NULL,
    `etiquette` VARCHAR(191) NOT NULL,
    `equipeCommercialeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Opportunite` ADD CONSTRAINT `Opportunite_equipeCommercialeId_fkey` FOREIGN KEY (`equipeCommercialeId`) REFERENCES `equipecommerciale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
