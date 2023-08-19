const express = require('express');
const routes = express.Router();
const {createUser,deleteUser,getUsers,loginUser,getUser, updateUserNotes,updateUser} = require('../Controllers/userController');


routes.post('/createUser',createUser);
routes.delete('/deleteuser/:id',deleteUser);
routes.get('/getUsers',getUsers);
routes.post('/loginUser',loginUser);
routes.get('/getUser',getUser);
routes.put('/updateUserNotes/:id',updateUserNotes);
routes.put('/updateUser/:id',updateUser);


module.exports = routes;