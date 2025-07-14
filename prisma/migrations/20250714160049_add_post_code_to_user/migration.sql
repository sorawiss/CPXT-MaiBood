/*
  Warnings:

  - You are about to drop the column `display_name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "display_name",
ADD COLUMN     "post_code" VARCHAR(5);
