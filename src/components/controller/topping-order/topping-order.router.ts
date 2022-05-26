import express from 'express';
import { ToppingOrderService } from '../../services/topping-order';
import {ToppingService} from "../../services/topping";
import { ToppingOrderValidator } from '../../../validate/topping-order-validator';
import { OrderService } from '../../../components/services/order';
import { BadRequestError, InternalServerError, NotFoundError } from '../../../error';

const router = express.Router();

/**
 * @swagger
 * /api/topping-order:
 *  post:
 *      summary: "create topping order"
 *      tags:
 *          - toppingOrder
 *      description: creates a topping order 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/toppingOrder"
 *      responses:
 *          '201':
 *              description: creates topping order and returns it
 *          '400':
 *              description: missing fields or toppingOrder already exists
 *          '401':
 *              description: topping not found
 *      security:
 *          - withAuth: []
 */

router.post('/', async(req, res) => {
   try {
        const { toppingId, quantity, orderId, toppingOrderPrice } = req.body;

        ToppingOrderValidator.validatetoppingOrderCreateBody(toppingId, quantity, orderId, toppingOrderPrice);
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

/**
 * @swagger
 * /api/topping-order:
 *  put:
 *      summary: "modify topping order"
 *      tags:
 *          - toppingOrder
 *      description: modifys a topping order quantity and price
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/modifyToppingOrder"
 *      responses:
 *          '201':
 *              description: modify topping order and returns it
 *          '400':
 *              description: missing fields or toppingOrder already exists
 *          '401':
 *              description: topping not found
 *      security:
 *          - withAuth: []
 */

router.put('/', async(req, res) => {
    try {
        const {toppingOrderId, quantity, toppingOrderPrice} = req.body;
        
        ToppingOrderValidator.validateToppingOrderUpdateBody(toppingOrderId, quantity, toppingOrderPrice);
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

/**
 * @swagger
 * /api/topping-order:
 *  delete:
 *      summary: "delete topping order"
 *      tags:
 *          - toppingOrder
 *      description: delete a topping order
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/deleteToppingOrder"
 *      responses:
 *          '204':
 *              description: removes topping order
 *          '400':
 *              description: bad requests missing fields
 *          '401':
 *              description: order not found
 *      security:
 *          - withAuth: []
 */

router.delete('/', async(req, res) => {
    try {
        const { toppingOrderId } = req.body;
        if (!toppingOrderId) {
            throw new BadRequestError('Missing fields');
        }

        let toppingOrder = await ToppingOrderService.find(toppingOrderId);
        if (!toppingOrder) {
            throw new NotFoundError('Order  not found');
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