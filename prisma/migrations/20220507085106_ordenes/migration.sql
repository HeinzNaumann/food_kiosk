-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `ordenId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Orden` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `pedido` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `Orden`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
