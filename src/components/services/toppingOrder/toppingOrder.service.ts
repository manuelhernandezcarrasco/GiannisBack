import { Prisma } from '@prisma/client';
import { prisma } from '../../../db'

export class ToppingOrderService {

    static findByOrder = (toppingId:number, orderId:number) => {
        return prisma.toppingOrder.findMany ({
           where: { toppingId, orderId }
        });
    }

    static create = ( data: Prisma.ToppingOrderCreateInput ) => {
        return prisma.toppingOrder.create({
            data,
        });
    }

    static find = ( where: Prisma.ToppingOrderWhereUniqueInput ) => {
        return prisma.toppingOrder.findUnique ({
            where,
        });
    }

    static findMany = ( orderId:number ) => {
        return prisma.toppingOrder.findMany({
            where: {orderId},
        });
    }

    static update = ( where: Prisma.ToppingOrderWhereUniqueInput, data: Prisma.ToppingOrderUpdateInput ) => {
        return prisma.toppingOrder.update({
            where,
            data,
        });
    }

    static remove = ( where: Prisma.ToppingOrderWhereUniqueInput ) => {
        return prisma.toppingOrder.delete({
            where,
        });
    }

}