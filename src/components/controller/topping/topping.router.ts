import { BadRequestError, InternalServerError, NotFoundError } from '../../../error';
import express from 'express';
import { ToppingService } from '../../services/topping';

const router = express.Router();

/**
 * @swagger
 * /api/topping:
 *  post:
 *      summary: "create topping"
 *      tags:
 *          - topping
 *      description: creates topping and returns it
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/topping"
 *      responses:
 *          '201':
 *              description: create topping and returns it
 *          '400':
 *              description: bad request missing fields
 *      security:
 *          - withAuth: []
 */

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

/**
 * @swagger
 * /api/topping:
 *  patch:
 *      summary: "edit topping"
 *      tags:
 *          - topping
 *      description: edit topping fields and returns new toppings
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/patchTopping"
 *      responses:
 *          '200':
 *              description: edit topping and returns new topping
 *          '400':
 *              description: bad request missing fields
 *          '404':
 *              description: topping not found
 *      security:
 *          - withAuth: []
 */

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

/**
 * @swagger
 * /api/topping:
 *  delete:
 *      summary: "delete topping"
 *      tags:
 *          - topping
 *      description: delete a topping
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/deleteTopping"
 *      responses:
 *          '204':
 *              description: removes a topping
 *          '400':
 *              description: bad request missing fields
 *          '404':
 *              description: topping not found
 *      security:
 *          - withAuth: []
 */

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