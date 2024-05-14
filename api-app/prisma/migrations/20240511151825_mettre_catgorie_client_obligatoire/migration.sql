-- AlterTable
ALTER TABLE `client` MODIFY `categorieId` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `promotion` MODIFY `categorieClientId` INTEGER NOT NULL DEFAULT 1;
