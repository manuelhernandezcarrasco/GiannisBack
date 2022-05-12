import { Decimal } from '@prisma/client/runtime';
import { BadRequestError, InternalServerError, NotFoundError } from 'error';
import express from 'express';
import { Validate } from 'validate';
import { BurgerService } from '../../services/burger';

const router = express.Router();

router.put('/', async(req, res) => {
   try {
        const { burgerId, description, price_simple, price_double, price_veggie } = req.body;

        Validate.validateBurgerUpdateBody(burgerId, description, price_simple, price_double, price_veggie);
        let burger = await BurgerService.find(burgerId);
        if (!burger) {
            throw new NotFoundError('Burger not found');
        }

        burger = await  BurgerService.update( burgerId, { description, price_simple, price_double, price_veggie });
        return res.status(200).json(burger);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

router.delete('/', async(req, res) => {
   try {
        const {burgerId} = req.body;

        if (!burgerId) {
            throw new BadRequestError('Missing fields');
        }

        const burger = await BurgerService.find(burgerId);
        if (!burger) {
            throw new NotFoundError('Burger no found');
        }

        await BurgerService.remove(burgerId);
        return res.status(204);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

router.post('/', async(req, res) => {
   try {
        const { name, description, price_simple, price_double, price_veggie } = req.body;

       if (!name) {
           throw new BadRequestError('Missing fields');
       }

       const burger = await BurgerService.create({ name, description, price_simple, price_double, price_veggie});
       return res.status(201).json(burger);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

export { router };