/*
  Warnings:

  - Added the required column `statut` to the `rendezvous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rendezvous` ADD COLUMN `statut` VARCHAR(191) NOT NULL;
