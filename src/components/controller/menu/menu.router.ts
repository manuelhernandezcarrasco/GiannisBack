import { ToppingService } from '../../services/topping';
import express from 'express';
import {BurgerService} from '../../services/burger';
import { InternalServerError, NotFoundError } from 'error';
import { Burger } from '@prisma/client';

const router = express.Router();

router.get('/burgers', async(req, res) => {
    try {
        const { pattern } = req.body;
        let burgers:Burger[] = undefined;
        if (!pattern) {
            burgers = await BurgerService.getBurgers();
        }else {
            burgers = await BurgerService.findMany(pattern);
        }

        if(!burgers) {
            throw new NotFoundError('Burgers not found');
        }
        return res.status(200).json(burgers);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.get('/toppings', async(req, res) => {
    try {
        const toppings = await ToppingService.getToppings();
        if (!toppings.length) {
            throw new NotFoundError('Toppings were not found');
        }

        return res.status(200).json(toppings);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});


export { router };