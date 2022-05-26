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
    
    static validateUserEmailBody = (email:string) => {
        const reMail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
        return email.match(reMail)
    }

}