/*
  Warnings:

  - You are about to drop the column `adresse` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `adresse`,
    DROP COLUMN `nom`,
    DROP COLUMN `prenom`,
    DROP COLUMN `telephone`;
