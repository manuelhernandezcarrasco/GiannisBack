import { Prisma } from '@prisma/client';
import { prisma } from '../../../db/index'

export class ToppingService {

    static find = ( where: Prisma.ToppingWhereUniqueInput ) => {
        return prisma.topping.findUnique({
           where,
        });
    }

    static create = ( data: Prisma.ToppingCreateInput ) => {
        return prisma.topping.create({
           data,
        });
    }

    static getToppings = () => {
        return prisma.topping.findMany;
    }

    static remove = ( where: Prisma.ToppingWhereUniqueInput ) => {
        return prisma.topping.delete({
            where,
        });
    }

    static update = ( where: Prisma.ToppingWhereUniqueInput, data: Prisma.ToppingUpdateInput ) => {
        return prisma.topping.update({
           where,
           data,
        });
    }

}