const express = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PasswordController = require('./app/controllers/PasswordController');
const ResetPasswordController = require('./app/controllers/ResetPasswordController');

const AccountController = require('./app/controllers/AccountController');
const BudgetController = require('./app/controllers/BudgetController');
const BudgetDashboardController = require('./app/controllers/BudgetDashboardController');
const CardController = require('./app/controllers/CardController');
const TargetController = require('./app/controllers/TargetController');

const routes = express.Router();

routes.post('/auth/register', UserController.store);
routes.post('/auth/authenticate', SessionController.store);
routes.post('/auth/forgot_password', PasswordController.store);
routes.post('/auth/reset_password', ResetPasswordController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.show);

routes.get('/accounts', AccountController.index);
routes.get('/accounts/:id', AccountController.show);
routes.post('/accounts', AccountController.store);
routes.put('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.destroy);

routes.get('/budgets/dashboard', BudgetDashboardController.index);

routes.get('/budgets', BudgetController.index);
routes.get('/budgets/:id', BudgetController.show);
routes.post('/budgets', BudgetController.store);
routes.put('/budgets/:id', BudgetController.update);
routes.delete('/budgets/:id', BudgetController.destroy);

routes.get('/cards', CardController.index);
routes.get('/cards/:id', CardController.show);
routes.post('/cards', CardController.store);
routes.put('/cards/:id', CardController.update);
routes.delete('/cards/:id', CardController.destroy);

routes.get('/targets', TargetController.index);
routes.get('/targets/:id', TargetController.show);
routes.post('/targets', TargetController.store);
routes.put('/targets/:id', TargetController.update);
routes.delete('/targets/:id', TargetController.destroy);

module.exports = routes;