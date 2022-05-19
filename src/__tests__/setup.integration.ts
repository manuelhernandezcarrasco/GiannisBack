import dotenv from 'dotenv';

import { prisma } from '../db/index';

beforeAll(() => {
  dotenv.config();
  //knex = setupDb();
});

afterAll(() => {
  //return knex.destroy();
});

beforeEach(() => {

});


export async function clearDB() {
  await Promise.all([
    prisma.burger.deleteMany(),
    prisma.order.deleteMany(),
    prisma.sale.deleteMany(),
    prisma.topping.deleteMany(),
    prisma.toppingOrder.deleteMany(),
    prisma.user.deleteMany(),
  ])
}