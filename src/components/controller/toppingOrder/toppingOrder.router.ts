import express from 'express';
import { ToppingOrderService } from '../../services/toppingOrder/index';
import {ToppingService} from "../../services/topping/index";

const router = express.Router();

router.post('/', async(req, res) => {
   try {
        const { toppingId, quantity, order, toppingOrderPrice } = req.body;
        if (!toppingId || !quantity || !order || !toppingOrderPrice) {
            return res.status(400).json('Missing fields');
        }

        const topping = await ToppingService.find( toppingId );
        if (!topping) {
            return res.status(404).json('Topping was not found');
        }

        const orders = await ToppingOrderService.findByOrder( toppingId, order );
        if (orders) {
            return res.status(400).json('toppingOrder already exists');
        }
        
        const toppingOrder = await ToppingOrderService.create({ toppingId, quantity, order, toppingOrderPrice });
        return res.status(201).json(toppingOrder);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

router.patch('/', async(req, res) => {
    try {
        const {toppingOrderId, quantity, toppingOrderPrice} = req.body;
        if (!toppingOrderId || !quantity || !toppingOrderPrice) {
            return res.status(400).json('Missing fields');
        }

        let toppingOrder = await ToppingOrderService.find(toppingOrderId);
        if (!toppingOrder) {
            return res.status(404).json('Order was not found');
        }

        toppingOrder = await ToppingOrderService.update( toppingOrderId, {quantity, toppingOrderPrice} );
        return res.status(200).json(toppingOrder);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.delete('/', async(req, res) => {
    try {
        const { toppingOrderId } = req.body;
        if (!toppingOrderId) {
            return res.status(400).json('Missing fields');
        }

        let toppingOrder = await ToppingOrderService.find(toppingOrderId);
        if (!toppingOrder) {
            return res.status(404).json('Order was not found');
        }

        toppingOrder = await ToppingOrderService.remove(toppingOrderId);
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };