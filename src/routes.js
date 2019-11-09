const express = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PasswordController = require('./app/controllers/PasswordController');
const ResetPasswordController = require('./app/controllers/ResetPasswordController');

const routes = express.Router();

routes.post('/auth/register', UserController.store);
routes.post('/auth/authenticate', SessionController.store);
routes.post('/auth/forgot_password', PasswordController.store);
routes.post('/auth/reset_password', ResetPasswordController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.show);

module.exports = routes;