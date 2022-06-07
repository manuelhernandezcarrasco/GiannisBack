import { BadRequestError, InternalServerError, NotFoundError } from '../../../error';
import express from 'express';
import { BurgerValidator } from '../../../validate/burger-validator';
import { BurgerService } from '../../services/burger';
import { uploadImage } from '../../../s3';

const router = express.Router();

/**
 * @swagger
 * /api/burger:
 *  put:
 *      summary: "modify burger"
 *      tags:
 *          - burger
 *      description: modify burger and returns it
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/modifyBurger"
 *      responses:
 *          '200':
 *              description: modify burger fields and returns edited burger
 *          '400':
 *              description: bad request missing fields
 *          '401':
 *              description: burger not found
 *      security:
 *          - withAuth: []
 */

router.put('/', async(req, res) => {
   try {
        const { burgerId, description, price_simple, price_double, price_veggie } = req.body;

        BurgerValidator.validateBurgerUpdateBody(burgerId, description, price_simple, price_double, price_veggie);
        let burger = await BurgerService.find(burgerId);
        if (!burger) {
            throw new NotFoundError('Burger not found');
        }

        burger = await  BurgerService.update( burgerId, { description, price_simple, price_double, price_veggie });
        return res.status(200).json(burger);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

/**
 * @swagger
 * /api/burger:
 *  delete:
 *      summary: "delete burger"
 *      tags:
 *          - burger
 *      description: deletes burger
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/deleteBurger"
 *      responses:
 *          '204':
 *              description: deletes burger
 *          '400':
 *              description: bad request missing fields
 *          '401':
 *              description: burger not found
 *      security:
 *          - withAuth: []
 */

router.delete('/', async(req, res) => {
   try {
        const {burgerId} = req.body;

        if (!burgerId) {
            throw new BadRequestError('Missing fields');
        }

        const burger = await BurgerService.find(burgerId);
        if (!burger) {
            throw new NotFoundError('Burger no found');
        }

        await BurgerService.remove(burgerId);
        return res.status(204);
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

/**
 * @swagger
 * /api/burger:
 *  post:
 *      summary: "create burger"
 *      tags:
 *          - burger
 *      description: creates burger and returns it
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/burger"
 *      responses:
 *          '201':
 *              description: create burger
 *          '400':
 *              description: bad request missing fields
 *      security:
 *          - withAuth: []
 */

router.post('/', uploadImage, async(req, res) => {
   try {

        const { name, description, price_simple, price_double, price_veggie } = req.body;
    
        const image = res.locals.image

       if (!name) {
           throw new BadRequestError('Missing fields');
       }

       const burger = await BurgerService.create({ name, description, price_simple, price_double, price_veggie, image});
       return res.status(201).json({burger, file: req.file});
   }
   catch (e) {
       console.log(e);
       throw new InternalServerError();
   }
});

export { router };