/*
  Warnings:

  - You are about to drop the column `adresse` on the `equipecommerciale` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `equipecommerciale` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `equipecommerciale` table. All the data in the column will be lost.
  - Added the required column `password` to the `chef` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `commerciale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chef` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `commerciale` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `equipecommerciale` DROP COLUMN `adresse`,
    DROP COLUMN `email`,
    DROP COLUMN `telephone`;
