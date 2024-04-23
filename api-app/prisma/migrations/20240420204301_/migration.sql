/*
  Warnings:

  - You are about to drop the column `localisatin` on the `rendezvous` table. All the data in the column will be lost.
  - Added the required column `localisation` to the `rendezvous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rendezvous` DROP COLUMN `localisatin`,
    ADD COLUMN `localisation` VARCHAR(191) NOT NULL;
