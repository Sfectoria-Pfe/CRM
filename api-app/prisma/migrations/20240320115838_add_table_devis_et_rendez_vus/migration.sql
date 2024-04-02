-- CreateTable
CREATE TABLE `Stageclient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_devis` INTEGER NOT NULL,
    `date_estimation` DATETIME(3) NOT NULL,
    `montant_total` DOUBLE NOT NULL,
    `prix_unitaire` DOUBLE NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `TVA` DOUBLE NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rendezvous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telephone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `temps` DATETIME(3) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devis` ADD CONSTRAINT `devis_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rendezvous` ADD CONSTRAINT `rendezvous_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
