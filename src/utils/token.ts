import jwt from 'jsonwebtoken';

const generateAccessToken = (data) => {
    const payload = {
        data,
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

const validateAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
        return false;
    }
}

export { generateAccessToken, validateAccessToken };
