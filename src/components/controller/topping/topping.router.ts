import { BadRequestError, InternalServerError, NotFoundError } from '../../../error';
import express from 'express';
import { ToppingService } from '../../services/topping';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
       const { name, price } = req.body;
       if (!name || !price) {
           throw new BadRequestError('Missing fields');
       }

       const topping = await ToppingService.create({ name, price });
       return res.status(201).json(topping);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.patch('/', async(req, res) => {
    try {
        const { toppingId, price } = req.body;

        if (!toppingId || !price) {
            throw new BadRequestError('Missing fields');
        }

        let topping = await ToppingService.find(toppingId);
        if (!topping) {
            throw new NotFoundError('Topping not found');
        }

        topping = await ToppingService.update(toppingId, price);
        return res.status(200).json(topping);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.delete('/', async(req, res) => {
    try {
        const { toppingId } = req.body;

        if (!toppingId) {
            throw new BadRequestError('Missing fields');
        }

        let topping = await ToppingService.find(toppingId);
        if (!topping) {
            throw new NotFoundError('Topping not found');
        }

        topping = await  ToppingService.remove(toppingId);
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };