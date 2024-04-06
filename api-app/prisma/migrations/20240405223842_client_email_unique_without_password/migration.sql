/*
  Warnings:

  - You are about to drop the column `password` on the `client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `password`;

-- CreateIndex
CREATE UNIQUE INDEX `Client_email_key` ON `Client`(`email`);
