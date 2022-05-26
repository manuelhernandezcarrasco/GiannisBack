import { ToppingService } from '../../services/topping';
import express from 'express';
import {BurgerService} from '../../services/burger';
import { InternalServerError, NotFoundError } from '../../../error';
import { Burger } from '@prisma/client';

const router = express.Router();

/**
 * @swagger
 * /api/menu/burgers:
 *  get:
 *      summary: "get burgers"
 *      tags:
 *          - menu
 *      description: get burgers menu
 *      responses:
 *          '200':
 *              description: returns paginated burgers
 */

router.get('/burgers/:limit', async(req, res) => {
    try {
        const { pattern, skip } = req.body;
        const { limit } = req.params;
        
        let burgers:Burger[] = undefined
        if(Number(pattern)) {
            burgers = await BurgerService.getByPrice(pattern, Number(limit), Number(skip))
        }
        else {
            burgers = await BurgerService.getBurgers(pattern, pattern, Number(limit), Number(skip));
        }

        return res.status(200).json({
            result: burgers,
            currentPage: Number(skip)%Number(limit),
            maxPage: burgers.length%Number(limit)
        });   
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

/**
 * @swagger
 * /api/menu/toppings:
 *  get:
 *      summary: "get toppings"
 *      tags:
 *          - menu
 *      description: get toppings menu
 *      responses:
 *          '200':
 *              description: returns paginated toppings
 */

router.get('/toppings', async(req, res) => {
    try {
        
        const toppings = await ToppingService.getToppings();
    
        return res.status(200).json(toppings);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };