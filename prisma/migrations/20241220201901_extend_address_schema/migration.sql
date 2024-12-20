-- AlterTable
ALTER TABLE `address` ADD COLUMN `formattedAddress` VARCHAR(191) NOT NULL DEFAULT CONCAT(lineOne, ', ', city, ', ', region, ', ', country);
