import { Order, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { DecipherCCM, sign } from 'crypto';
import { resourceLimits } from 'worker_threads';
import { prisma } from '../../../db'

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

    static getSales = (id?:number, userId?:string, limit?:number, skip?:number) => {
        return prisma.sale.findMany({
            skip: skip,
            take:limit,
            where: { 
                OR: [{
                    id: id,
                    userId: userId
                }]
            }
        })
    }

    static getSalesByState = (accepted?:boolean, sent?:boolean, received?:boolean, limit?: number, skip?: number) => {
        return prisma.sale.findMany({
            skip:skip,
            take:limit,
            where: {
                OR: [{
                    accepted:accepted,
                    sent:sent,
                    received:received
                }]
            }
        })
    }

    static getGreaterSales = (price?:Decimal, limit?:number, skip?:number) => {
        return prisma.sale.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                total: 'desc'
            },
            where: { 
                total: {
                    gt: price
                }
            } 
        })
    }

    static getSmallerSales = (price?:Decimal, limit?:number, skip?:number) => {
        return prisma.sale.findMany({
            skip:skip,
            take:-limit,
            orderBy: {
                total: 'asc'
            },
            where: {
                total: {
                    lt: price
                }
            }
        })
    }

    static update = ( where: Prisma.SaleWhereUniqueInput, data: Prisma.SaleUpdateInput) => {
        return prisma.sale.update({
            where, 
            data,
        });
    }

    static getTotal = (orders:Order[]) => {
        return orders.reduce((prev, cur) => prev + Number(cur.orderPrice), 0);;
    }

}