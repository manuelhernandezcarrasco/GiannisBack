import express from 'express';
import { ToppingService } from '../../services/topping/index';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
       const { name, price } = req.body;
       if (!name || !price) {
           return res.status(400).json('Missing fields');
       }

       let topping = await ToppingService.find(name);
       if (topping) {
           return res.status(400).json('Topping with that name already exists');
       }

       topping = await ToppingService.create({ name, price });
       return res.status(201).json(topping);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.get('/', async(req, res) => {
    try {
        const toppings = await ToppingService.getToppings();
        if (!toppings.length) {
            return  res.status(404).json('Toppings were not found');
        }

        return res.status(200).json(toppings);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.patch('/', async(req, res) => {
    try {
        const { toppingId, price } = req.body;

        if (!toppingId || !price) {
            return res.status(400).json('Missing fields');
        }

        let topping = await ToppingService.find(toppingId);
        if (!topping) {
            return res.status(404).json('Topping was not found');
        }

        topping = await ToppingService.update(toppingId, price);
        return res.status(200).json(topping);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.delete('/', async(req, res) => {
    try {
        const { toppingId } = req.body;

        if (!toppingId) {
            return res.status(400).json('Missing fields');
        }

        let topping = await ToppingService.find(toppingId);
        if (!topping) {
            return res.status(404).json('Topping was not found');
        }

        topping = await  ToppingService.remove(toppingId);
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };