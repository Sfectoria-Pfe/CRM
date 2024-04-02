-- CreateTable
CREATE TABLE `chef` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cin` INTEGER NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `nomEntreprise` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` INTEGER NOT NULL,
    `datenaissance` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commerciale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipecommerciale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_equipe` VARCHAR(191) NOT NULL,
    `nombre` INTEGER NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` INTEGER NOT NULL,
    `commercialeId` INTEGER NOT NULL,
    `chefId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equipecommerciale` ADD CONSTRAINT `equipecommerciale_commercialeId_fkey` FOREIGN KEY (`commercialeId`) REFERENCES `commerciale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipecommerciale` ADD CONSTRAINT `equipecommerciale_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `chef`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
