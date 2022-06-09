import { Decimal } from "@prisma/client/runtime";
import { BadRequestError } from "../error";

export class ToppingOrderValidator {

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