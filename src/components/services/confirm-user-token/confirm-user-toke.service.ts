import { Prisma } from '@prisma/client'
import { prisma } from '../../../db'

export class ConfirmUserTokenService {

    static find = (where: Prisma.ConfirmUserTokenWhereUniqueInput) => {
        return prisma.confirmUserToken.findUnique({
            where,
        })
    }

    static create = (data: Prisma.ConfirmUserTokenCreateInput) => {
        return prisma.confirmUserToken.create({
            data,
        })
    }

    static remove = (where: Prisma.ConfirmUserTokenWhereUniqueInput) => {
        return prisma.confirmUserToken.delete({
            where,
        })
    }   

}