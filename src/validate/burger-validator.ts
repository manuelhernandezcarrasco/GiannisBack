import { Decimal } from "@prisma/client/runtime";
import { BadRequestError } from "../error";

export class BurgerValidator {

    static validateBurgerUpdateBody = (id:number, description?:string, price_simple?:Decimal, price_double?:Decimal, price_veggie?:Decimal) => {
        if(id && (description || price_simple || price_double || price_veggie)) {
            return;
        }
        throw new  BadRequestError('Missing fields');
    }
    
}