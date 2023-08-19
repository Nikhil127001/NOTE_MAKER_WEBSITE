const jwt = require('jsonwebtoken');
require('dotenv').config;

const createToken = (_id, name) => {
    return jwt.sign({ _id, name }, process.env.JWT_SECRET,
        { expiresIn: '7hr' }
    )
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
};

module.exports = { createToken, verifyToken };