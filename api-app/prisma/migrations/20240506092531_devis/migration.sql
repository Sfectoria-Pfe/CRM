/*
  Warnings:

  - You are about to drop the column `adresse` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_entreprise` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `email_entreprise` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `nom_entreprise` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `devis` table. All the data in the column will be lost.
  - You are about to drop the column `telephone_entreprise` on the `devis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `devis` DROP COLUMN `adresse`,
    DROP COLUMN `adresse_entreprise`,
    DROP COLUMN `description`,
    DROP COLUMN `email`,
    DROP COLUMN `email_entreprise`,
    DROP COLUMN `name`,
    DROP COLUMN `nom`,
    DROP COLUMN `nom_entreprise`,
    DROP COLUMN `price`,
    DROP COLUMN `quantity`,
    DROP COLUMN `telephone_entreprise`;
