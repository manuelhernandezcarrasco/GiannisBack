import express from 'express';
import { UserService } from '../../services/user/index';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json('Missing fields');
        }

        let user = await UserService.find(email);
        if (user) {
            return res.status(400).json(`User with email ${email} already exists`);
        }

        user = await UserService.create({ name, email, password, phone });
        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json('Missing fields');
        }


        let loginData = await UserService.login( email, password );
        if (!loginData) {
            return res.status(404).json(`User with email ${email} not found`);
        }

        return res.status(201).json(loginData);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});

export { router };