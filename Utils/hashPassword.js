const bcrypt = require('bcrypt');
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) =>   bcrypt.hashSync(password,salt);

const verifyPassword = (password,Hashpassword) =>  bcrypt.compareSync(password,Hashpassword);

module.exports = {hashPassword,verifyPassword}
