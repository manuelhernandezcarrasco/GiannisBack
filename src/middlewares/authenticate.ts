import { validateAccessToken } from '../utils/token';
import {UserService} from "../components/services/user/index";

const withAuth = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    if (!header || !token) {
        return res.status(401).json('Access token missing from header');
    }

    const validated = validateAccessToken(token);
    if (!validated) {
        return res.status(401).json('Access token is not valid');
    }

    res.locals.id = validated;
    next();
}

const authAdmin = async(req,res,next) => {
    withAuth(req, res, next);
    const { id } = res.locals;
    const user = await UserService.find( id );
    if (!user.isAdmin) {
        return res.status(401).json('Unauthorized');
    }

    next();
}

export { withAuth, authAdmin };
