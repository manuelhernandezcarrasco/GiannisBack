import { BadRequestError } from "../error";

export class UserValidator {

    static validateUserUpdateBody = (id:number, name?:string, phone?:string, password?: string) => {
        if( id && (name || phone || password)) {
            return;
        }
        throw new BadRequestError('Missing fields');
    }

    static validateUserCreateBody = (name:string, email:string, password:string, phone:number) => {
        if(!name || !email || !password || !phone) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }
    
}