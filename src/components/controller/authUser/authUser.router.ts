import { User } from '@prisma/client';
import express from "express";
import {UserService} from "../../services/user/index";

const router = express.Router();

router.patch('/', async(req, res) => {
    try {
       const {id} = res.locals;
       const  {name, phone, password } = req.body;

       if (!id || (name || phone || password)) {
           return res.status(400).json('Missing fields');
       }

       return res.status(204);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };