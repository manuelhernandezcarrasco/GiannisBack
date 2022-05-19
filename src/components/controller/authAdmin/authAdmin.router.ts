import express from "express";
import {UserService} from "../../services/user";
import {SaleService} from "../../services/sale";
import { BadRequestError, InternalServerError, NotFoundError } from "error";
import { Sale } from "@prisma/client";

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

router.get('/users/:limit', async(req, res) => {
    try {
        const { limit } = req.params
        const { pattern, skip } = req.body

        const users = await UserService.getUsers(pattern, pattern, pattern, Number(limit), Number(skip))

        return res.status(200).json({
            result: users,
            currentPage: Number(limit)%Number(skip),
            maxPage: users.length%Number(limit)
        })

    } catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
})

router.get('/sales/:limit', async(req, res) => {
    try {
        const { limit } = req.params
        const { pattern, skip, accepted, sent, received, sort} = req.body
        
        let sales:Sale[] = undefined
        if (accepted || sent || received) {
            sales = await SaleService.getSalesByState(accepted, sent, received, Number(limit), Number(skip))
        } if (Number(pattern)) {
            if(sort) {
                sales = await SaleService.getGreaterSales(pattern, Number(limit), Number(skip))
            } else {
                sales = await SaleService.getSmallerSales(pattern, Number(limit), Number(skip))
            }
        } else {
            sales = await SaleService.getSales(pattern, pattern, Number(limit), Number(skip))
        }

        return res.status(200).json({
            result: sales,
            currentPage: Number(limit)%Number(skip),
            maxPage: sales.length%Number(pattern)
        });

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