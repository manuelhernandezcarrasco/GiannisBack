import { Order, Prisma, Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
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

    static getSales = async({pattern, limit, skip, accepted, sent, received, sort} : {pattern?:string, limit?:number, skip?:number, accepted?:boolean, sent?:boolean, received?:boolean, sort?:boolean}) => {
        let sales:Sale[] = undefined
        let length = 0
        if(!skip) skip = 0

        if (accepted || sent || received) {
            length = await this.countByState({accepted:accepted, sent:sent, received:received})
            if(!limit) limit = length
            sales = await this.getSalesByState({accepted:accepted, sent:sent, received:received, limit:limit, skip:skip})
        }else if (Number(pattern)) {
            length
            if(sort) {
                length = await this.countGreaterSales(new Decimal(pattern))
                if(!limit) limit = length
                sales = await this.getGreaterSales({price:new Decimal(pattern), limit:limit, skip:skip})
            } else {
                length = await this.countSmallerSales(new Decimal(pattern))
                if(!limit) limit = length
                sales = await this.getSmallerSales({price:new Decimal(pattern), limit:limit, skip:skip})
            }
        } else if(pattern) {
            length = await this.countByPattern({id:pattern, userId:pattern})
            sales = await this.getSalesByPattern({id:pattern, userId:pattern, limit:limit, skip:skip})
        } else {
            length = await prisma.sale.count()
            if(!limit) limit = length
            sales = await prisma.sale.findMany({
                skip:skip,
                take:limit
            })
        }

        return {
            result: sales,
            currentPage: Number(skip)/Number(limit),
            maxPage: length / Number(limit)
        }
    }

    static countByState = ({accepted, sent, received} : {accepted?:boolean, sent?: boolean, received?:boolean}) => {
        return prisma.sale.count({
            where: {
                OR: [{
                    accepted:accepted,
                    sent:sent,
                    received:received
                }]
            }
        })
    }

    static getSalesByState = ({accepted,sent,received,limit,skip} : {accepted?:boolean, sent?:boolean, received?:boolean, limit?: number, skip?: number}) => {
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

    static countGreaterSales = (price:Decimal) => {
        return prisma.sale.count({
            where: { 
                total: {
                    gt: price
                }
            } 
        })
    }

    static getGreaterSales = ( {price, limit, skip} : {price?:Decimal, limit?:number, skip?:number}) => {
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

    static countSmallerSales = (price:Decimal) => {
        return prisma.sale.count({
            where: {
                total: {
                    lt: price
                }
            }
        })
    }

    static getSmallerSales = ({price, limit, skip} : {price?:Decimal, limit?:number, skip?:number}) => {
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

    static countByPattern = ({id, userId} : {id?:string, userId?:string}) => {
        return prisma.sale.count({
            where: { 
                OR: [{
                    id: id,
                    userId: userId
                }]
            }
        })
    }

    static getSalesByPattern = ({id, userId, limit, skip} : {id?:string, userId?:string, limit?:number, skip?:number}) => {
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