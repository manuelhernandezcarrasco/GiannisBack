/*
  Warnings:

  - The primary key for the `Burger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Topping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ToppingOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Validated` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[code]` on the table `Validated` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Validated` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_saleId_fkey";

-- DropForeignKey
ALTER TABLE "ToppingOrder" DROP CONSTRAINT "ToppingOrder_orderId_fkey";

-- AlterTable
ALTER TABLE "Burger" DROP CONSTRAINT "Burger_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Burger_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Burger_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "burgerId" SET DATA TYPE TEXT,
ALTER COLUMN "saleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sale_id_seq";

-- AlterTable
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Topping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Topping_id_seq";

-- AlterTable
ALTER TABLE "ToppingOrder" DROP CONSTRAINT "ToppingOrder_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "toppingId" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ToppingOrder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ToppingOrder_id_seq";

-- AlterTable
ALTER TABLE "Validated" DROP CONSTRAINT "Validated_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Validated_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Validated_code_key" ON "Validated"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToppingOrder" ADD CONSTRAINT "ToppingOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
