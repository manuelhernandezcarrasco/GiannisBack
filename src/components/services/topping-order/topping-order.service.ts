import { Order, Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export class ToppingOrderService {

    static findMany = (where: Prisma.ToppingOrderWhereInput) => {
        return prisma.toppingOrder.findMany ({
           where,
        });
    }

    static create = ( data: Omit<Prisma.ToppingOrderCreateInput, "order"> & {order:Order} ) => {
        const insertData = {
            ...data,
            order: { connect: (order: { id: any; }) => { return {id:order.id} },
            } 
        }
        return prisma.toppingOrder.create({
            data: insertData,
        });
    }

    static find = ( where: Prisma.ToppingOrderWhereUniqueInput ) => {
        return prisma.toppingOrder.findUnique ({
            where,
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