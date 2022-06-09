/*
  Warnings:

  - The `description` column on the `Burger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `price_simple` on table `Burger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_double` on table `Burger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_veggie` on table `Burger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accepted` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sent` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `received` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isAdmin` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `validated` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Burger" DROP COLUMN "description",
ADD COLUMN     "description" INTEGER,
ALTER COLUMN "price_simple" SET NOT NULL,
ALTER COLUMN "price_double" SET NOT NULL,
ALTER COLUMN "price_veggie" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "accepted" SET NOT NULL,
ALTER COLUMN "sent" SET NOT NULL,
ALTER COLUMN "received" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET NOT NULL,
ALTER COLUMN "validated" SET NOT NULL;
