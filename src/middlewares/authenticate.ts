import { validateAccessToken } from '../utils/token';
import {UserService} from "../components/services/user";
import { UnauthenticatedError, UnauthorizedError } from 'error';

const withAuth = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    if (!header || !token) {
        throw new UnauthenticatedError('Access token missing from header');
    }

    const validated = validateAccessToken(token);
    if (!validated) {
        throw new UnauthenticatedError('Access token is not valid');
    }

    res.locals.id = validated;
    next();
}

const authAdmin = async(req,res,next) => {
    withAuth(req, res, next);
    const { id } = res.locals;
    const user = await UserService.find( id );
    if (!user.isAdmin) {
        throw new UnauthorizedError('Unauthorized');
    }

    next();
}

export { withAuth, authAdmin };
