import express from 'express';

import { router as userRouter } from '../components/controller/user';
import { router as userAuthRouter } from '../components/controller/authUser';
import { router as menuRouter } from '../components/controller/menu';
import { router as burgerRouter } from '../components/controller/burger';
import { router as toppingRouter } from '../components/controller/topping';
import { router as orderRouter } from '../components/controller/order';
import { router as toppingOrderRouter } from '../components/controller/topping-order';
import { router as saleRouter } from '../components/controller/sale';
import { router as adminRouter } from '../components/controller/authAdmin';
import { withAuth, authAdmin } from "../middlewares/authenticate";

const router = express.Router();

// no Auth logs
router.use('/user', userRouter);
router.use('/menu', menuRouter);

// user auth logs
router.use('/auth-user', withAuth, userAuthRouter);
router.use('/order', withAuth, orderRouter);
router.use('/topping-order', withAuth, toppingOrderRouter);
router.use('/sale', withAuth, saleRouter);

// admin auth logs
router.use('/burger', authAdmin, burgerRouter);
router.use('/topping', authAdmin, toppingRouter);
router.use('/admin', authAdmin, adminRouter);

export { router };