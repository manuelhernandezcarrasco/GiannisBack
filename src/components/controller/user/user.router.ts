import { ValidatedService } from '../../services/validated';
import { BadRequestError, InternalServerError, UnauthenticatedError } from '../../../error';
import express from 'express';
import axios from 'axios';
import { UserValidator } from '../../../validate/user-validator';
import { UserService } from '../../services/user';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        UserValidator.validateUserCreateBody(name, email, password, Number(phone));
        if(!UserService.isEmail) {
            throw new UnauthenticatedError(`${email} is not an email`)
        }
        const user = await UserService.create({ name, email, password, phone });
        const validated = await ValidatedService.create({userId:user.id})
        await UserService.sendMail(user.email, validated.code)

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

router.patch('/validate/:code', async(req, res) => {
    try {
        const { code } = req.params

        const validated = await ValidatedService.find({code:code})
        if(!validated) {
            throw new UnauthenticatedError('User was not validated')
        }
        const user = await UserService.find({id:validated.userId})
        await UserService.update({id:user.id}, {validated:true})
        await ValidatedService.remove({code:code})

        return res.status(200).json('User was validated')
    }
    catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
})

export { router };