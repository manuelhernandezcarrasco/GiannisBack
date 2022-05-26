import { Prisma } from '@prisma/client';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../../../error';
import { prisma } from '../../../db';
import { hashPassword, validatePassword } from '../../../utils/password';
import { generateAccessToken } from '../../../utils/token';
import axios from 'axios';

export class UserService {

    static find = ( where: Prisma.UserWhereUniqueInput ) => {
        return prisma.user.findUnique({
            where, 
        });
    }

    static create = async ( data: Prisma.UserCreateInput ) => {
        const hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
        return prisma.user.create({
            data,
        });
    }

    static update = ( where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput ) => {
        return prisma.user.update({
            where,
            data,
        });
    }

    static remove = ( where: Prisma.UserWhereUniqueInput ) => {
        return prisma.user.delete({
            where,
        });
    } 

    static getUsers = (id?:string, name?: string, email?: string, limit?: number, skip?:number) => {
        return prisma.user.findMany({
            skip: skip,
            take:limit,
            where: { 
                OR: [{
                    id: {
                        contains: id
                    },
                    name: {
                        contains: name
                    },
                    email: {
                        contains: email
                    }
                }]
            }
        })
    }

    static login = async ( email:string, password:string ) => {
        const user = await this.find({ email });
        if (!user) throw new NotFoundError('User not found');

        if(!user.validated) throw new UnauthenticatedError('User was not authenticated')

        const validated = await validatePassword(password, user.password);
        if (!validated) throw new BadRequestError('Wrong password');

        delete user.password;

        const token = generateAccessToken( user.id );
        return { user, token };
    }

}
