-- AlterTable
ALTER TABLE `Image` MODIFY `temporalUrlTransformFile` TEXT NULL,
    MODIFY `colors` VARCHAR(40) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `creditBalance` TINYINT NULL DEFAULT 10,
    MODIFY `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` TIMESTAMP(6) NULL;
