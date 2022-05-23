import { Prisma } from '@prisma/client'
import { prisma } from '../../../db'

export class ValidatedService {

    static find = (where: Prisma.ValidatedWhereUniqueInput) => {
        return prisma.validated.findUnique({
            where,
        })
    }

    static create = (data: Prisma.ValidatedCreateInput) => {
        return prisma.validated.create({
            data,
        })
    }

    static remove = (where: Prisma.ValidatedWhereUniqueInput) => {
        return prisma.validated.delete({
            where,
        })
    }

}