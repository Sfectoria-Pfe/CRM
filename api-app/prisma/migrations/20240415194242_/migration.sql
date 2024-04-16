/*
  Warnings:

  - Added the required column `sujet` to the `DemandeDevis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `demandedevis` ADD COLUMN `sujet` VARCHAR(191) NOT NULL,
    MODIFY `etat` VARCHAR(191) NOT NULL DEFAULT 'En attente';
