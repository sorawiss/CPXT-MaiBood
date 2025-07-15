-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facebook" VARCHAR(16),
ADD COLUMN     "instagram" VARCHAR(16),
ADD COLUMN     "line" VARCHAR(16);

-- CreateIndex
CREATE INDEX "Fridge_user_id_idx" ON "Fridge"("user_id");

-- CreateIndex
CREATE INDEX "Fridge_status_idx" ON "Fridge"("status");

-- CreateIndex
CREATE INDEX "Fridge_exp_date_idx" ON "Fridge"("exp_date");

-- CreateIndex
CREATE INDEX "Fridge_user_id_status_idx" ON "Fridge"("user_id", "status");
