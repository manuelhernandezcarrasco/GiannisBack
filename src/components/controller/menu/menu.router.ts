import { ToppingService } from '../../services/topping';
import express from 'express';
import {BurgerService} from '../../services/burger';
import { InternalServerError, NotFoundError } from '../../../error';
import { Burger } from '@prisma/client';
import { uploadImage } from '../../../s3';
import { prisma } from 'db';

const router = express.Router();

/**
 * @swagger
 * /api/menu/burgers:
 *  get:
 *      summary: "get burgers"
 *      tags:
 *          - menu
 *      description: get burgers menu
 *      responses:
 *          '200':
 *              description: returns paginated burgers
 */

router.get('/burgers', async(req, res) => {
    try {
        const { pattern } = req.query
        let { limit, skip } = req.query;
        
        const burgers = await BurgerService.getBurgers({ pattern:String(pattern), limit:Number(limit), skip:Number(skip) })

        return res.status(200).json(burgers);   
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

/**
 * @swagger
 * /api/menu/toppings:
 *  get:
 *      summary: "get toppings"
 *      tags:
 *          - menu
 *      description: get toppings menu
 *      responses:
 *          '200':
 *              description: returns paginated toppings
 */

router.get('/toppings', async(req, res) => {
    try {
        
        const toppings = ToppingService.getToppings();
    
        return res.status(200).json(toppings);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.post('/image', uploadImage, async(req,res, next) => {
    try {
        return res.status(200).json(req.file)
    }
    catch(e) {
        console.log(e);
        throw new InternalServerError();
    }
})

export { router };