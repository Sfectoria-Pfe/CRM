/*
  Warnings:

  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Opportunite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service_Opportunite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StageClient` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientId` on table `stageclient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stageId` on table `stageclient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `stageclient` DROP FOREIGN KEY `StageClient_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `stageclient` DROP FOREIGN KEY `StageClient_stageId_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `opportunite` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `service_opportunite` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `stage` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `stageclient` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `clientId` INTEGER NOT NULL,
    MODIFY `stageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `StageClient` ADD CONSTRAINT `StageClient_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StageClient` ADD CONSTRAINT `StageClient_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
