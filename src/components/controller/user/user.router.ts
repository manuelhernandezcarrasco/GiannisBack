import { BadRequestError, InternalServerError, UnauthenticatedError } from 'error';
import express from 'express';
import { Validate } from 'validate';
import { UserService } from '../../services/user';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        Validate.validateUserCreateBody(name, email, password, phone);
        const user = await UserService.create({ name, email, password, phone });
        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError('Missing fields');
        }


        let loginData = await UserService.login( email, password );
        if (!loginData) {
            throw new UnauthenticatedError('Invalid credentials');
        }

        return res.status(201).json(loginData);
    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

export { router };