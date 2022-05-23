/*
  Warnings:

  - You are about to drop the `validated` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "validated";

-- CreateTable
CREATE TABLE "Validated" (
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Validated_pkey" PRIMARY KEY ("code")
);
