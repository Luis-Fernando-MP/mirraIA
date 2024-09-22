-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clerkId` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(50) NULL DEFAULT '',
    `lastName` VARCHAR(50) NULL DEFAULT '',
    `planId` SMALLINT NULL DEFAULT 1,
    `creditBalance` TINYINT NOT NULL DEFAULT 10,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `User_clerkId_key`(`clerkId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `transformationType` VARCHAR(50) NOT NULL,
    `visibility` ENUM('public', 'private') NOT NULL DEFAULT 'public',
    `prompt` VARCHAR(100) NULL DEFAULT '',
    `temporalUrlTransformFile` VARCHAR(255) NULL DEFAULT '',
    `tags` VARCHAR(255) NULL DEFAULT '',
    `publicId` VARCHAR(255) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `bytes` INTEGER NOT NULL DEFAULT 0,
    `width` INTEGER NOT NULL DEFAULT 0,
    `height` INTEGER NOT NULL DEFAULT 0,
    `colors` TEXT NULL,
    `transformationUrl` TEXT NULL,
    `authorEditor` VARCHAR(50) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    INDEX `Image_title_idx`(`title`),
    INDEX `Image_tags_idx`(`tags`),
    INDEX `Image_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
