import { Order, Prisma, Sale, ToppingOrder } from '@prisma/client';
import { prisma } from '../../../db'

export class OrderService {

    static create = ( data: Omit<Prisma.OrderCreateInput, "sale"> & {sale:Sale} ) => {
        const insetData = {
            ...data,
            sale: { connect: (sale: { id: any; }) => { return {id:sale.id} },
            }
        }    
        return prisma.order.create({
            data: insetData,
        });
    }

    static find = ( where: Prisma.OrderWhereUniqueInput) => {
        return prisma.order.findUnique({
            where,
        });
    }

    static update = ( where: Prisma.OrderWhereUniqueInput, data: Omit<Prisma.OrderUpdateInput, "toppings">  & {toppings:ToppingOrder[]}) => {
        const insertData = {
            ...data,
            toppings: { connect: data.toppings.map(topping => { return { id: topping.id }}) },
        } 
        return prisma.order.update({
            where,
            data: insertData,
        });
    }

    static updateMany = (orders:Order[]) => {
        return prisma.order.updateMany({
            where: {
                id: { 
                    in: orders.map((order)=>order.id)
                }
            },
            data: {
                active: false,
            }
        });
    }

    static remove = ( where: Prisma.OrderWhereUniqueInput) => {
        return prisma.order.delete({
            where,
        });
    }

    static findMany = ( where: Prisma.OrderWhereInput ) => {
        return prisma.order.findMany({
            where,
        });
    }

}
