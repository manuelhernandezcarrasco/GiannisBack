import { Order } from '@prisma/client';
import express from 'express';
import { OrderService } from '../../services/order/order.service';
import {SaleService} from '../../services/sale/index';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const { userId } = res.locals;
        const { total } = req.body;

        if  (!total) {
            return res.status(400).json('Missing fields');
        }
        
        const orders = await OrderService.getOrders(userId);
        const sale = await SaleService.create( { userId, orders, total } );
        await OrderService.updateMany(orders);
        return res.status(201).json(sale);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };