import express from 'express';
import { ToppingOrderService } from '../../services/topping-order';
import {ToppingService} from "../../services/topping";
import { Validate } from 'validate';
import { OrderService } from 'components/services/order';
import { notDeepEqual } from 'assert';
import { BadRequestError, InternalServerError, NotFoundError } from 'error';

const router = express.Router();

router.post('/', async(req, res) => {
   try {
        const { toppingId, quantity, orderId, toppingOrderPrice } = req.body;

        Validate.validatetoppingOrderCreateBody(toppingId, quantity, orderId, toppingOrderPrice);
        const topping = await ToppingService.find( toppingId );
        if (!topping) {
            throw new NotFoundError('Topping not found');
        }

        const orders = await ToppingOrderService.findMany( {toppingId, orderId} );
        if (orders) {
            throw new BadRequestError('toppingOrder already exists');
        }
        
        const order = await OrderService.find(orderId);
        const toppingOrder = await ToppingOrderService.create({ toppingId, quantity, order, toppingOrderPrice });
        return res.status(201).json(toppingOrder);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

router.put('/', async(req, res) => {
    try {
        const {toppingOrderId, quantity, toppingOrderPrice} = req.body;
        
        Validate.validateToppingOrderUpdateBody(toppingOrderId, quantity, toppingOrderPrice);
        let toppingOrder = await ToppingOrderService.find(toppingOrderId);
        if (!toppingOrder) {
            throw new NotFoundError('Order was not found');
        }

        toppingOrder = await ToppingOrderService.update( toppingOrderId, {quantity, toppingOrderPrice} );
        return res.status(200).json(toppingOrder);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.delete('/', async(req, res) => {
    try {
        const { toppingOrderId } = req.body;
        if (!toppingOrderId) {
            throw new BadRequestError('Missing fields');
        }

        let toppingOrder = await ToppingOrderService.find(toppingOrderId);
        if (!toppingOrder) {
            throw new NotFoundError('Order was not found');
        }

        toppingOrder = await ToppingOrderService.remove(toppingOrderId);
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };