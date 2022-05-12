import { User } from '@prisma/client';
import { InternalServerError, NotFoundError } from 'error';
import express from "express";
import { Validate } from 'validate';
import {UserService} from "../../services/user";

const router = express.Router();

router.patch('/', async(req, res) => {
    try {
       const {id} = res.locals;
       const  {name, phone, password } = req.body;

       Validate.validateUserUpdateBody(id, name, phone, password);
       const user = await UserService.update(id, {name, phone, password});
       if(!user) {
           throw new NotFoundError('User not found');
       }

       return res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };