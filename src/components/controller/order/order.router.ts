import express from 'express';
import { OrderService } from '../../services/order';
import {BurgerService} from '../../services/burger';
import { ToppingOrderService } from '../../../components/services/topping-order';
import { OrderValidator } from '../../../validate/order-validator';
import { BadRequestError, InternalServerError, NotFoundError } from 'error';
import { SaleService } from '../../../components/services/sale';

const router = express.Router();

router.post('/', async(req, res) => {
   try {
       const { userId } = res.locals;
       const { burgerId, orderPrice, saleId } = req.body;
       
        OrderValidator.validateOrderCreateBody(userId, burgerId, orderPrice);
       const burger = await BurgerService.find(burgerId);
       if (!burger) {
           throw new NotFoundError('Burger was not found')
       }

       const sale = await SaleService.find(saleId);
       const order = await OrderService.create( { burgerId, userId, orderPrice, sale} );
       return res.status(201).json(order);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

router.put('/', async(req, res) => {
    try {
        const { orderId, orderPrice } = req.body;

        OrderValidator.validateOrderUpdateBody(orderId, orderPrice);
        let order = OrderService.find(orderId);
        if (!order) {
            throw new NotFoundError('Order was not found');
        }

        const toppings = await ToppingOrderService.findMany(orderId);
        order = OrderService.update(orderId, { toppings, orderPrice} );
        return res.status(200).json(order);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }

});

router.delete('/', async(req, res) => {
   try {
       const {orderId}  = req.body;

       if (!orderId) {
           throw new BadRequestError('Missing fields');
       }

       let order = await OrderService.find(orderId);
       if (!order) {
           throw new NotFoundError('Order not found');
       }

       order = await OrderService.remove(orderId);
       return res.status(204);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

export { router };