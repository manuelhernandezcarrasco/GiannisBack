import { ToppingService } from '../../services/topping';
import express from 'express';
import {BurgerService} from '../../services/burger';
import { InternalServerError, NotFoundError } from 'error';
import { Burger } from '@prisma/client';

const router = express.Router();

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
            currentPage: Number(limit)%Number(skip),
            maxPage: burgers.length%Number(limit)
        });
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

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