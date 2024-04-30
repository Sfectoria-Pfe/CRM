/*
  Warnings:

  - Added the required column `title` to the `ServiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicedetail` ADD COLUMN `title` VARCHAR(191) NOT NULL;
