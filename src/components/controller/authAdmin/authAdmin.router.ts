import express from "express";
import {UserService} from "../../services/user/index";
import {SaleService} from "../../services/sale/index";

const router = express.Router();

router.patch('/createadmin', async(req, res) => {
    try {
        const {userId} = req.body;

        if (!userId) {
            return res.status(400).json('Missing fields');
        }

        const user = await UserService.find(userId);
        if(!user) {
            return res.status(404).json('Usern not found');
        }

        const isAdmin:boolean = true;
        await UserService.update(userId, {isAdmin} );
        return res.status(204);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.get('/unnaccepted', async(req, res) => {
    try {
        const sales = await SaleService.getSales();
        if ( sales.length = 0) {
            res.status(404).json('Sales not found');
        }

        return res.status(200).json(sales);

    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.put('/manage', async(req, res) => {
    try {
        const { saleId, accepted, sent, received } = req.body;
 
        if (!saleId || (accepted || sent || received)) {
            return res.status(400).json('Missing fields');
        }
 
        let sale = SaleService.find(saleId);
        if(!sale) {
            return res.status(404).json('sale was not found');
        }

        sale = SaleService.update( saleId, { accepted, sent, received } );
        return res.status(200).json(sale);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 });


export { router };