import express from "express";
import {UserService} from "../../services/user";
import {SaleService} from "../../services/sale";
import { BadRequestError, InternalServerError, NotFoundError } from "error";

const router = express.Router();

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

router.get('/show-sales', async(req, res) => {
    try {
        const sales = await SaleService.getSales();
        if ( sales.length = 0) {
            throw new NotFoundError('Sales not found');
        }

        return res.status(200).json(sales);

    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

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