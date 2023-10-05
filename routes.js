const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');


// Rotas da home
route.get('/', homeController.index)

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/signup', loginController.signup);
route.post('/login/signin', loginController.signin);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', contatoController.index);
route.post('/contato/cadastro', contatoController.cadastro);
route.post('/contato/edit/:id', contatoController.edit);
route.get('/contato/index/:id', contatoController.editIndex);
route.get('/contato/delete/:id', contatoController.delete);

module.exports = route;
