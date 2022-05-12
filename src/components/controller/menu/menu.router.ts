import express from 'express';
import {BurgerService} from '../../services/burger/index';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const burgers = await BurgerService.getBurgers();
        if (!burgers.length) {
            return res.status(404).json("Burgers not found");
        }

        return res.status(200).json(burgers);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };