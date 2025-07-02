-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('fresh', 'selling', 'sold', 'expired');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(16) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "profile_picture" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fridge" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(16) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" "StatusType" NOT NULL DEFAULT 'fresh',
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fridge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- AddForeignKey
ALTER TABLE "Fridge" ADD CONSTRAINT "Fridge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
