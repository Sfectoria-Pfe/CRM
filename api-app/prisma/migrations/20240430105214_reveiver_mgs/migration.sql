-- AlterTable
ALTER TABLE `msgsclient` ADD COLUMN `receiverId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `MsgsClient` ADD CONSTRAINT `MsgsClient_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
