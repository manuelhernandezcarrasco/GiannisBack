/*
  Warnings:

  - Made the column `name` on table `Burger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `burgerId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Topping` required. This step will fail if there are existing NULL values in that column.
  - Made the column `toppingId` on table `ToppingOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `ToppingOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `ToppingOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_saleId_fkey";

-- DropForeignKey
ALTER TABLE "ToppingOrder" DROP CONSTRAINT "ToppingOrder_orderId_fkey";

-- AlterTable
ALTER TABLE "Burger" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price_simple" DROP NOT NULL,
ALTER COLUMN "price_double" DROP NOT NULL,
ALTER COLUMN "price_veggie" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "burgerId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "saleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "accepted" DROP NOT NULL,
ALTER COLUMN "sent" DROP NOT NULL,
ALTER COLUMN "received" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Topping" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "ToppingOrder" ALTER COLUMN "toppingId" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "isAdmin" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToppingOrder" ADD CONSTRAINT "ToppingOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
