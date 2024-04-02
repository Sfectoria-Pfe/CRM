/*
  Warnings:

  - You are about to drop the `stageclient` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `opportunite` MODIFY `date_estimation` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `stageclient`;
