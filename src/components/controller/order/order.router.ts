import express from 'express';
import { OrderService } from '../../services/order/index';
import {BurgerService} from '../../services/burger/index';
import { Sale, ToppingOrder } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ToppingOrderService } from 'components/services/toppingOrder';

const router = express.Router();

router.post('/', async(req, res) => {
   try {
       const { userId } = res.locals;
       const { burgerId, orderPrice, sale } = req.body;
       
       if (!burgerId || !userId || !orderPrice) {
           return res.status(400).json('Missing fields');
       }

       const burger = await BurgerService.find(burgerId);
       if (!burger) {
           return res.status(404).json('Burger was not found')
       }

       const order = await OrderService.create( { burgerId, userId, orderPrice, sale} );
       return res.status(201).json(order);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

router.put('/', async(req, res) => {
    try {
        const { orderId, orderPrice } = req.body;

        if (!orderId || !orderPrice) {
            return res.status(400).json('Missing fields');
        }

        let order = OrderService.find(orderId);
        if (!order) {
            return res.status(404).json('Order was not found');
        }

        const toppings = await ToppingOrderService.findMany(orderId);
        order = OrderService.update(orderId, { toppings, orderPrice} );
        return res.status(200).json(order);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }

});

router.delete('/', async(req, res) => {
   try {
       const {orderId}  = req.body;

       if (!orderId) {
           return res.status(400).json('Missing fields');
       }

       let order = await OrderService.find(orderId);
       if (!order) {
           return res.status(404).json('Order was not found');
       }

       order = await OrderService.remove(orderId);
       return res.status(204);
   }
   catch (e) {
       console.log(e);
       return res.status(500).json('Internal server error');
   }
});

export { router };