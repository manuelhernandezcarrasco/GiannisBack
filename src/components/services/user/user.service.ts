import { Prisma } from '@prisma/client';
import { prisma } from '../../../db'
import { hashPassword, validatePassword } from '../../../utils/password';
import { generateAccessToken } from '../../../utils/token';

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

    static delete = ( where: Prisma.UserWhereUniqueInput ) => {
        return prisma.user.delete({
            where,
        });
    }

    static login = async ( email:string, password:string ) => {
        const user = await this.find({ email });
        if (!user) return false;

        const validated = await validatePassword(password, user.password);
        if (!validated) return false;

        delete user.password;

        const token = generateAccessToken({ userId: user.id });
        return { user, token };
    }
}
