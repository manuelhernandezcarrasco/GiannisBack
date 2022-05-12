import { Order, Prisma } from '@prisma/client';
import { prisma } from '../../../db/index'
import {OrderService} from "../order/index";

export class SaleService {

    static find = ( where: Prisma.SaleWhereUniqueInput ) => {
        return prisma.sale.findUnique({
            where,
        });
    }

    static create = async( data: Omit<Prisma.SaleCreateInput, "orders">  & {orders:Order[]}) => {
        const insertData = {
            ...data,
            orders: { connect: data.orders.map(order => { return { id: order.id }}) },
        } 
        return prisma.sale.create({
            data: insertData
        });
    }

    static getSales = () => {
        return prisma.sale.findMany({
            where: { accepted : false}
        });
    }

    static update = ( where: Prisma.SaleWhereUniqueInput, data: Prisma.SaleUpdateInput) => {
        return prisma.sale.update({
            where, 
            data,
        });
    }

}