import { Prisma } from '@prisma/client';
import { prisma } from '../../../db'

export class BurgerService {

    static find = ( where: Prisma.BurgerWhereUniqueInput ) => {
        return prisma.burger.findUnique({
            where,
        });
    }

    static create = ( data: Prisma.BurgerCreateInput) => {
        return prisma.burger.create({
            data,
        });
    }

    static update = ( where: Prisma.BurgerWhereUniqueInput, data: Prisma.BurgerUpdateInput) => {
        return prisma.burger.update({
            where,
            data,
        });
    }

    static remove = ( where: Prisma.BurgerWhereUniqueInput) => {
        return prisma.burger.delete({
            where,
        });
    }

    static getBurgers = (name?:string, description?:string, limit?:number, skip?: number) => {
        return prisma.burger.findMany({
            skip: skip,
            take:limit,
            where: { 
                OR: [{
                    name: {
                        contains: name
                    },
                    description: {
                        contains:description
                    }
                }]
            }
        });
    }

    static getByPrice = (price?: number, limit?:number, skip?:number) => {
        return prisma.burger.findMany({
            skip: skip,
            take:-limit,
            orderBy: {
                price_simple: 'asc',
                price_double: 'asc',
                price_veggie: 'asc'
            },
            where: { 
                OR: [{
                    price_simple: {
                        lt: price
                    },
                    price_double: {
                        lt: price
                    },
                    price_veggie: {
                        lt: price
                    }
                }]
            } 
        })
    }

    static findMany = ( where: Prisma.BurgerWhereInput ) => {
        return prisma.burger.findMany({
            where,
        });
    }

}