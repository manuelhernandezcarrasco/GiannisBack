import { Burger, Prisma } from '@prisma/client';
import { Pattern } from 'aws-sdk/clients/lambda';
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

    static getBurgers = async({pattern, limit, skip} : { pattern?:string, limit:number, skip:number }) => {
        let burgers:Burger[] = undefined
        let length = 0
        if(!skip) skip = 0
        if(Number(pattern)) {
            length = await prisma.burger.count()
            if(!limit) limit = length
            burgers = await this.getByPrice({price:Number(pattern), limit:limit, skip:skip})
        }
        else if(pattern){
            length = await this.countByPattern({name:pattern, description:pattern})
            if(!limit) limit = length
            burgers = await this.getByPattern({ name:pattern, description:pattern, limit:limit, skip:skip});
        }
        else {
            length = await this.countByPattern({name:pattern, description:pattern})
            if(!limit) limit = length
            burgers = await prisma.burger.findMany({
                skip:skip,
                take:limit
            })
        }

        return {
            result: burgers,
            currentPage: Number(skip) / Number(limit),
            maxPage: length / Number(limit)
        } 
        
    }

    static getByPrice = async({price, limit, skip}: {price?: number, limit?:number, skip?:number}) => {
        return prisma.burger.findMany({
            skip:skip,
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

    static countByPattern = async({name, description} : {name?:string, description?:string}) => {
        return prisma.burger.count({
            where: { 
                OR: [{
                    name: {
                        contains: name
                    },
                   description: {
                        contains: description
                    }
                }]
            }    
        })
    }

    static getByPattern = async({name, description, limit, skip}: {name?:string, description?:string, limit?:number, skip?:number}) => {
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

}