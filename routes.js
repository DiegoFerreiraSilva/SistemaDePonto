const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const pontoController = require('./src/controllers/pontoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da Home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/logon', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de Marcação de Ponto
route.get('/ponto/index', loginRequired, pontoController.index);
route.post('/ponto/pontoMarcado', loginRequired, pontoController.baterPonto);

module.exports = route;
