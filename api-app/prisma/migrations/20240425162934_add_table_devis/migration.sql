/*
  Warnings:

  - You are about to drop the column `TVA` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `date_estimation` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `montant_total` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `numero_devis` on the `devis` table. All the data in the column will be lost.
  - Added the required column `description` to the `devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `devis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `devis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devis` DROP COLUMN `TVA`,
    DROP COLUMN `date_estimation`,
    DROP COLUMN `montant_total`,
    DROP COLUMN `numero_devis`,
    ADD COLUMN `adresse` VARCHAR(191) NULL,
    ADD COLUMN `adresse_entreprise` VARCHAR(191) NULL,
    ADD COLUMN `currency` VARCHAR(191) NULL,
    ADD COLUMN `currentDate` DATETIME(3) NULL,
    ADD COLUMN `dateOfIssue` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `discountAmount` DOUBLE NULL,
    ADD COLUMN `discountRate` DOUBLE NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `email_entreprise` VARCHAR(191) NULL,
    ADD COLUMN `invoiceNumber` INTEGER NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `nom` VARCHAR(191) NULL,
    ADD COLUMN `nom_entreprise` VARCHAR(191) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `subTotal` DOUBLE NULL,
    ADD COLUMN `taxAmount` DOUBLE NULL,
    ADD COLUMN `taxRate` DOUBLE NULL,
    ADD COLUMN `telephone_entreprise` VARCHAR(191) NULL,
    ADD COLUMN `total` DOUBLE NULL;
