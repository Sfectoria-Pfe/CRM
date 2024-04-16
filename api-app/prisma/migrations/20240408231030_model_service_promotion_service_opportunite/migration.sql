-- CreateTable
CREATE TABLE `Promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pourcentage` DOUBLE NOT NULL,
    `categorieClientId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service_Opportunite` (
    `opportuniteId` INTEGER NOT NULL,
    `serviceId` INTEGER NULL,
    `prix` DOUBLE NOT NULL,
    `isPromotion` BOOLEAN NOT NULL,
    `discountAmout` DOUBLE NOT NULL,

    UNIQUE INDEX `Service_Opportunite_opportuniteId_key`(`opportuniteId`),
    UNIQUE INDEX `Service_Opportunite_serviceId_key`(`serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_categorieClientId_fkey` FOREIGN KEY (`categorieClientId`) REFERENCES `CategorieClient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Opportunite` ADD CONSTRAINT `Service_Opportunite_opportuniteId_fkey` FOREIGN KEY (`opportuniteId`) REFERENCES `Opportunite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Opportunite` ADD CONSTRAINT `Service_Opportunite_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
