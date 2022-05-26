/*
  Warnings:

  - You are about to drop the `Validated` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Validated";

-- CreateTable
CREATE TABLE "ConfirmUserToken" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ConfirmUserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmUserToken_code_key" ON "ConfirmUserToken"("code");
