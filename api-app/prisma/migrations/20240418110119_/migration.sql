-- AlterTable
ALTER TABLE `service` MODIFY `imageURL` VARCHAR(255) NOT NULL,
    MODIFY `price` DOUBLE NULL;

-- AlterTable
ALTER TABLE `servicedetail` MODIFY `imageURL` VARCHAR(255) NOT NULL;
