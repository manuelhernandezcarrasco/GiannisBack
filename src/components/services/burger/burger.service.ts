import { Prisma } from '@prisma/client';
import { prisma } from '../../../db/index'

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

    static getBurgers = () => {
        return prisma.burger.findMany();
    }


}