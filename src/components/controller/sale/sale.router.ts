import { InternalServerError } from '../../../error';
import express from 'express';
import { OrderService } from '../../services/order/order.service';
import {SaleService} from '../../services/sale';

const router = express.Router();

/**
 * @swagger
 * /api/sale:
 *  post:
 *      summary: "create sale"
 *      tags:
 *          - sale
 *      description: create sale
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/sale"
 *      responses:
 *          '201':
 *              description: creates sale and returns it
 *      security:
 *          - withAuth: []
 */

router.post('/', async(req, res) => {
    try {
        const { userId } = res.locals;
        
        const orders = await OrderService.findMany({userId, active:true});
        const total = SaleService.getTotal(orders);
        const sale = await SaleService.create( { userId, orders, total } );
        await OrderService.updateMany(orders, sale);
        return res.status(201).json(sale);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };