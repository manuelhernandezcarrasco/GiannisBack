import express from 'express';

import { router as userRouter } from '../components/controller/user/index';
import { router as userAuthRouter } from '../components/controller/authUser/index';
import { router as menuRouter } from '../components/controller/menu/index';
import { router as burgerRouter } from '../components/controller/burger/index';
import { router as toppingRouter } from '../components/controller/topping/index';
import { router as orderRouter } from '../components/controller/order/index';
import { router as toppingOrderRouter } from '../components/controller/toppingOrder/index';
import { router as saleRouter } from '../components/controller/sale/index';
import { router as adminRouter } from '../components/controller/authAdmin/authAdmin.router';
import { withAuth, authAdmin } from "../middlewares/authenticate";

const router = express.Router();

// no Auth logs
router.use('/user', userRouter);
router.use('/menu', menuRouter);

// user auth logs
router.use('/authuser', withAuth, userAuthRouter);
router.use('/order', withAuth, orderRouter);
router.use('/toppingorder', withAuth, toppingOrderRouter);
router.use('/sale', withAuth, saleRouter);

// admin auth logs
router.use('/burger', authAdmin, burgerRouter);
router.use('/topping', authAdmin, toppingRouter);
router.use('/admin', authAdmin, adminRouter);

export { router };