-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "phone" INTEGER,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Burger" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT NOT NULL,
    "price_simple" MONEY NOT NULL DEFAULT -1,
    "price_double" MONEY NOT NULL DEFAULT -1,
    "price_veggie" MONEY NOT NULL DEFAULT -1,

    CONSTRAINT "Burger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" MONEY NOT NULL DEFAULT 0.0,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "total" MONEY DEFAULT 0.0,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "received" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "burgerId" INTEGER,
    "userId" INTEGER,
    "saleId" INTEGER NOT NULL,
    "orderPrice" MONEY NOT NULL DEFAULT 0.0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToppingOrder" (
    "id" SERIAL NOT NULL,
    "toppingId" INTEGER,
    "quantity" INTEGER,
    "orderId" INTEGER,
    "toppingOrderPrice" MONEY NOT NULL,

    CONSTRAINT "ToppingOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Burger_name_key" ON "Burger"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topping_name_key" ON "Topping"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToppingOrder" ADD CONSTRAINT "ToppingOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
