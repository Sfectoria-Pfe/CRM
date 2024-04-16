-- CreateTable
CREATE TABLE `DemandeDevis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateDemande` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `etat` VARCHAR(191) NOT NULL,
    `clientId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DemandeDevis` ADD CONSTRAINT `DemandeDevis_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
