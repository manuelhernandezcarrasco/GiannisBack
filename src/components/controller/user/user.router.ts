import { ConfirmUserTokenService } from '../../services/confirm-user-token';
import { BadRequestError, InternalServerError, UnauthenticatedError } from '../../../error';
import express from 'express';
import axios from 'axios';
import { UserValidator } from '../../../validate/user-validator';
import { UserService } from '../../services/user';

const router = express.Router();

/** 
 * @swagger
 * /api/user/signup:
 *  post:
 *      summary: "create new user"
 *      tags:
 *          - user
 *      description: Create a new User and sends confirmation email
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '201':
 *              description: create user and turn in back on response
 *          '400':
 *              description: bad request missing fields, or email is on wrong formal
*/

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        UserValidator.validateUserCreateBody(name, email, password, Number(phone));
        if(!UserValidator.validateUserEmailBody(email)) {
            throw new BadRequestError(`${email} is not an email`)
        }
        const user = await UserService.create({ name, email, password, phone });
        const confirmed = await ConfirmUserTokenService.create({userId:user.id})
        await axios.post(process.env.MAIL_SERVICE_LINK, { email:email, code:confirmed.code })

        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: "login user"
 *      tags:
 *          - user
 *      description: log in to user account and response loginData
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/loginUser"
 *      responses:
 *          '201':
 *              description: creates logIn data and turns it back on response
 *          '400':
 *              description: Bad request, missing fields
 *          '401':
 *              description: Invalid credentials or user is not validated
 */

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
        if(!loginData.user.validated) {
            throw new UnauthenticatedError('User is not validated')
        }

        return res.status(201).json(loginData);
    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    }
});

/**
 * @swagger
 * /api/user/validate:
 *  patch:
 *      summary: "validate user"
 *      tags:
 *          - user
 *      description: gets a code and validates user with id in ConfirmUserToken table
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/validateUser"
 *      responses:
 *          '201':
 *              description: crea el logIn data y lo devuelve
 *          '400':
 *              description: bad request falta algun campo o el mail no tiene formato de mail
 *          '401':
 *              description: invalid credentials o user no fue validado
 */

router.patch('/validate/:code', async(req, res) => {
    try {
        const { code } = req.params

        const confirmed = await ConfirmUserTokenService.find({code:code})
        if(!confirmed) {
            throw new BadRequestError('User token was not confirmed')
        }
        const user = await UserService.find({id:confirmed.userId})
        await UserService.update({id:user.id}, {validated:true})
        await ConfirmUserTokenService.remove({code:code})

        return res.status(200).json('User was validated')
    }
    catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
})

export { router };