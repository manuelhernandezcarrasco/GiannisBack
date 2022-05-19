import jwt from 'jsonwebtoken';

const generateAccessToken = (data:string) => {
    const payload = {
        data,
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

const validateAccessToken = (token:string) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
        return false;
    }
}

export { generateAccessToken, validateAccessToken };
