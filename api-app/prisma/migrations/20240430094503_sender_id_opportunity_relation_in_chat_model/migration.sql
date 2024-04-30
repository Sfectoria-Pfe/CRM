/*
  Warnings:

  - You are about to drop the column `roomId` on the `msgsclient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `msgsclient` table. All the data in the column will be lost.
  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `opportunityId` to the `MsgsClient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `msgsclient` DROP FOREIGN KEY `MsgsClient_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `msgsclient` DROP FOREIGN KEY `MsgsClient_userId_fkey`;

-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_opportuniteId_fkey`;

-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_userId_fkey`;

-- AlterTable
ALTER TABLE `msgsclient` DROP COLUMN `roomId`,
    DROP COLUMN `userId`,
    ADD COLUMN `opportunityId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `participants`;

-- DropTable
DROP TABLE `room`;

-- AddForeignKey
ALTER TABLE `MsgsClient` ADD CONSTRAINT `MsgsClient_opportunityId_fkey` FOREIGN KEY (`opportunityId`) REFERENCES `Opportunite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MsgsClient` ADD CONSTRAINT `MsgsClient_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
