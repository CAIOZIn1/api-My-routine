const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/auth/register', UserController.store);

module.exports = routes;
