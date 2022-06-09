import express from "express";
import {UserService} from "../../services/user";
import {SaleService} from "../../services/sale";
import { BadRequestError, InternalServerError, NotFoundError } from "../../../error";
import { Sale, User } from "@prisma/client";
import { prisma } from "db";
import { Decimal } from "@prisma/client/runtime";

const router = express.Router();

/**
 * @swagger
 * /api/admin/create-admin:
 *  patch:
 *      summary: "creates admin"
 *      tags:
 *          - admin
 *      description: makes a user admin
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createAdmin"
 *      responses:
 *          '204':
 *              description: makes a user admin
 *          '400':
 *              description: bad request missing fields
 *          '404':
 *              description: user not found
 *      security:
 *          - withAuth: []
 */

router.patch('/create-admin', async(req, res) => {
    try {
        const {userId} = req.body;

        if (!userId) {
            throw new BadRequestError('Missing fields');
        }

        const user = await UserService.find(userId);
        if(!user) {
            throw new NotFoundError('User not found');
        }

        await UserService.update(userId, {isAdmin:true} );
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

/**
 * @swagger
 * /api/admin/users:
 *  get:
 *      summary: "gets users"
 *      tags:
 *          - admin
 *      description: gets all users
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/getUsers"
 *      responses:
 *          '200':
 *              description: returns paginated users
 *      security:
 *          - withAuth: []
 */

router.get('/users', async(req, res) => {
    try {
        const { pattern } = req.query
        let { limit, skip } = req.query

        const users = await UserService.getUsers({pattern:String(pattern), limit:Number(limit), skip:Number(skip)})

        return res.status(200).json(users)

    } catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
})

/**
 * @swagger
 * /api/admin/sales:
 *  get:
 *      summary: "gets sales"
 *      tags:
 *          - admin
 *      description: gets all sales
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/getSales"
 *      responses:
 *          '200':
 *              description: returns paginated sales
 *      security:
 *          - withAuth: []
 */

router.get('/sales', async(req, res) => {
    try {
        const { pattern, sort, accepted, sent, received } = req.query
        let { limit, skip } = req.query
        
        const sales = await SaleService.getSales({pattern:String(pattern), sort:Boolean(sort), accepted:Boolean(accepted), sent:Boolean(sent), received:Boolean(received)})

        return res.status(200).json(sales);

    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

 /**
 * @swagger
 * /api/admin/accept:
 *  patch:
 *      summary: "accept sale"
 *      tags:
 *          - admin
 *      description: accept a sale
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/manageSale"
 *      responses:
 *          '200':
 *              description: returns sale accepted
 *          '400':
 *              description: Bad request missing fields
 *          '404':
 *              description: Sale not found
 *      security:
 *          - withAuth: []
 */

router.patch('/accept', async(req, res) => {
    try {
        const { saleId } = req.body;
 
        if (!saleId) {
            throw new BadRequestError('Missing fields');
        }
 
        let sale = SaleService.find(saleId);
        if(!sale) {
            throw new NotFoundError('Sales not found');
        }

        sale = SaleService.update( saleId, {accepted:true} );
        return res.status(200).json(sale);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
 });

/**
 * @swagger
 * /api/admin/send:
 *  patch:
 *      summary: "send sale"
 *      tags:
 *          - admin
 *      description: send a sale
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/manageSale"
 *      responses:
 *          '200':
 *              description: returns send accepted
 *          '400':
 *              description: Bad request missing fields
 *          '404':
 *              description: Sale not found
 *      security:
 *          - withAuth: []
 */

 router.patch('/send', async(req, res) => {
    try {
        const { saleId } = req.body;
 
        if (!saleId) {
            throw new BadRequestError('Missing fields');
        }
 
        let sale = SaleService.find(saleId);
        if(!sale) {
           throw new NotFoundError('Sale not found');
        }

        sale = SaleService.update( saleId, {sent:true} );
        return res.status(200).json(sale);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
 });

/**
 *  @swagger
 * /api/admin/received:
 *  patch:
 *      summary: "receive sale"
 *      tags:
 *          - admin
 *      description: receive a sale
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/manageSale"
 *      responses:
 *          '200':
 *              description: returns received accepted
 *          '400':
 *              description: Bad request missing fields
 *          '404':
 *              description: Sale not found
 *      security:
 *          - withAuth: []
 */

 router.patch('/received', async(req, res) => {
    try {
        const { saleId } = req.body;
 
        if (!saleId) {
            throw new BadRequestError('Missing fields');
        }
 
        let sale = SaleService.find(saleId);
        if(!sale) {
            throw new NotFoundError('sale not found');
        }

        sale = SaleService.update( saleId, {received:true} );
        return res.status(200).json(sale);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
 });

export { router };