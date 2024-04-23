/*
  Warnings:

  - You are about to drop the column `email` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `temps` on the `rendezvous` table. All the data in the column will be lost.
  - Added the required column `heure` to the `rendezvous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localisatin` to the `rendezvous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typebien` to the `rendezvous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rendezvous` DROP COLUMN `email`,
    DROP COLUMN `telephone`,
    DROP COLUMN `temps`,
    ADD COLUMN `heure` DATETIME(3) NOT NULL,
    ADD COLUMN `localisatin` VARCHAR(191) NOT NULL,
    ADD COLUMN `typebien` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `imageURL` VARCHAR(255) NULL,
    MODIFY `type` ENUM('location', 'vente', 'autre') NOT NULL DEFAULT 'vente';
