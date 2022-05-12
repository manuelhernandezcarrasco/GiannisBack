import { Decimal } from "@prisma/client/runtime";
import { BadRequestError } from "error";

export class Validate {

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

    static validateBurgerUpdateBody = (id:number, description?:string, price_simple?:Decimal, price_double?:Decimal, price_veggie?:Decimal) => {
        if(id && (description || price_simple || price_double || price_veggie)) {
            return;
        }
        throw new  BadRequestError('Missing fields');
    }

    static validateOrderCreateBody = (userId:number, burgerId:number, orderPrice:Decimal) => {
        if(!userId || !burgerId || !orderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }

    static validateOrderUpdateBody = (orderId:number, orderPrice:Decimal) => {
        if(!orderId || !orderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }

    static validatetoppingOrderCreateBody = (toppingId:number, quantity:number, orderId:number, toppingOrderPrice:Decimal) => {
        if( !toppingId || !quantity || !orderId || !toppingOrderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }

    static validateToppingOrderUpdateBody = ( toppingOrderId:number, quantity:number, toppingOrderPrice:Decimal) => {
        if(!toppingOrderId || !quantity || !toppingOrderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }

}
