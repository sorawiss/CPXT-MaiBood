/*
  Warnings:

  - You are about to alter the column `category` on the `Fridge` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "Fridge" ADD COLUMN     "price" INTEGER,
ALTER COLUMN "category" SET DATA TYPE VARCHAR(1);
