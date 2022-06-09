import { Decimal } from "@prisma/client/runtime";
import { BadRequestError } from "../error";

export class OrderValidator {

    static validateOrderUpdateBody = (orderId:number, orderPrice:Decimal) => {
        if(!orderId || !orderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }

    static validateOrderCreateBody = (userId:number, burgerId:number, orderPrice:Decimal) => {
        if(!userId || !burgerId || !orderPrice) {
            throw new BadRequestError('Missing fields');
        }
        return;
    }
    
}