import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const validatePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export { hashPassword, validatePassword };