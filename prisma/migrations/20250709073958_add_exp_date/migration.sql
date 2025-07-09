/*
  Warnings:

  - Added the required column `exp_date` to the `Fridge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fridge" ADD COLUMN     "exp_date" TIMESTAMP(3) NOT NULL;
