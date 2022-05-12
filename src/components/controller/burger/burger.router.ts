import { Decimal } from '@prisma/client/runtime';
import express from 'express';
import { BurgerService } from '../../services/burger/index';

const router = express.Router();

router.put('/', async(req, res) => {
   try {
        const { burgerId, description, price_simple, price_double, price_veggie } = req.body;

        if (!burgerId || (description || price_simple || price_double || price_veggie)) {
            return res.status(400).json('Missing fields');
        }

        let burger = await BurgerService.find(burgerId);
        if (!burger) {
            return res.status(404).json('Burger was not found');
        }

        burger = await  BurgerService.update( burgerId, { description, price_simple, price_double, price_veggie });
        return res.status(200).json(burger);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

router.delete('/', async(req, res) => {
   try {
        const {burgerId} = req.body;

        if (!burgerId) {
            return res.status(400).json('Missing fields');
        }

        const burger = await BurgerService.find(burgerId);
        if (!burger) {
            return res.status(404).json('Burger was no found');
        }

        await BurgerService.remove(burgerId);
        return res.status(204);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

router.post('/', async(req, res) => {
   try {
        const { name, description, price_simple, price_double, price_veggie } = req.body;

       if (!name || !description) {
           return  res.status(400).json('Missing fields');
       }

       let burger = await BurgerService.find(name);
       if (burger) {
            return res.status(409).json('Burger with name already exists');
       }

       burger = await BurgerService.create({ name, description, price_simple, price_double, price_veggie});
       return res.status(201).json(burger);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

export { router };