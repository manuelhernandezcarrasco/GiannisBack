import { InternalServerError, NotFoundError } from '../../../error';
import express from "express";
import { UserValidator } from '../../../validate/user-validator';
import {UserService} from "../../services/user";

const router = express.Router();

/**
 * @swagger
 * /api/auth-user:
 *  patch:
 *      summary: "patch user"
 *      tags:
 *          - authUser
 *      description: patch a user attribute
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/patchUser"
 *      responses:
 *          '200':
 *              description: changes user attribute and returns it
 *          '400':
 *              description: bad request missing fields
 *          '401':
 *              description: user not found
 *      security:
 *          - withAuth: []
 */

router.patch('/', async(req, res) => {
    try {
       const {id} = res.locals;
       const  {name, phone, password } = req.body;

       UserValidator.validateUserUpdateBody(id, name, phone, password);
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