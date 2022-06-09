import dotenv from 'dotenv';

import { prisma } from '../db/index';

beforeAll(() => {
  dotenv.config();
  clearDB()
  //knex = setupDb();
});

afterAll(() => {
  //return knex.destroy();
});

beforeEach(() => {
  clearDB()
});


export async function clearDB() {
  await Promise.all([
    prisma.burger.deleteMany(),
    prisma.user.deleteMany(),
    prisma.topping.deleteMany(),
    prisma.toppingOrder.deleteMany(),
    prisma.order.deleteMany(),
    prisma.sale.deleteMany(),
    prisma.confirmUserToken.deleteMany(),
  ])
}  