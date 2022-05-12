import { Order, Prisma, ToppingOrder } from '@prisma/client';
import { prisma } from '../../../db/index'

export class OrderService {

    static create = ( data: Prisma.OrderCreateInput ) => {
        return prisma.order.create({
            data,
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

    static getOrders = ( userId:number ) => {
        return prisma.order.findMany({
            where: {userId, active : true}
        });
    }

}
