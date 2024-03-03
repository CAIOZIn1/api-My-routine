const express = require('express');
const UserController = require('./controllers/UserController');
const checkToken = require('./middleware/checkToken');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.get('/user/:id', checkToken, UserController.privateRoute);
routes.post('/auth/register', UserController.store);
routes.post('/auth/login', UserController.authenticate);

module.exports = routes;
