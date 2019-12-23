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
const CompanyController = require('./app/controllers/CompanyController');
const ExpenseController = require('./app/controllers/ExpenseController');
const ExpenseYearController = require('./app/controllers/ExpenseYearController');
const ExpenseDashboardController = require('./app/controllers/ExpenseDashboardController');
const ExpenseCategoryMonthController = require('./app/controllers/ExpenseCategoryMonthController');
const ExpenseCategoryYearController = require('./app/controllers/ExpenseCategoryYearController');
const InvestmentController = require('./app/controllers/InvestmentController');
const RedeemInvestmentController = require('./app/controllers/RedeemInvestmentController');
const InvoiceController = require('./app/controllers/InvoiceConreoller');
const InvoiceCardController = require('./app/controllers/InvoiceCardController');
const InvoiceDashboardController = require('./app/controllers/InvoiceDashboardController');
const ItemController = require('./app/controllers/ItemController');
const MovimentationController = require('./app/controllers/MovimentationController');
const MovimentationMonthController = require('./app/controllers/MovimentationMonthController');
const MovimentationYearController = require('./app/controllers/MovimentationYearController');
const MovimentationCategoryMonthController = require('./app/controllers/MovimentationCategoryMonthController');
const MovimentationCategoryYearController = require('./app/controllers/MovimentationCategoryYearController');
const MovimentationCompanyController = require('./app/controllers/MovimentationCompanyController');
const MovimentationIncomeController = require('./app/controllers/MovimentationIncomeController');
const MovimentationOutcomeController = require('./app/controllers/MovimentationOutcomeController');
const ProfitController = require('./app/controllers/ProfitController');
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

routes.get('/companies', CompanyController.index);
routes.get('/companies/:id', CompanyController.show);
routes.post('/companies', CompanyController.store);
routes.put('/companies/:id', CompanyController.update);
routes.delete('/companies/:id', CompanyController.destroy);

routes.get('/expenses/category/month', ExpenseCategoryMonthController.index);
routes.get('/expenses/category/year', ExpenseCategoryYearController.index);

routes.get('/expenses/dashboard', ExpenseDashboardController.index);

routes.get('/expenses/year', ExpenseYearController.index);

routes.get('/expenses/invoice', ExpenseController.index);
routes.get('/expenses/:id', ExpenseController.show);
routes.post('/expenses', ExpenseController.store);
routes.put('/expenses/:id', ExpenseController.update);
routes.delete('/expenses/:id', ExpenseController.destroy);

routes.delete('/investments/redeem/:id', RedeemInvestmentController.destroy);

routes.get('/investments', InvestmentController.index);
routes.get('/investments/:id', InvestmentController.show);
routes.post('/investments', InvestmentController.store);
routes.put('/investments/:id', InvestmentController.update);
routes.delete('/investments/:id', InvestmentController.destroy);

routes.get('/invoices/card', InvoiceCardController.index);

routes.get('/invoices/dashboard', InvoiceDashboardController.index);
routes.put('/invoices/dashboard/:id', InvoiceDashboardController.update);

routes.get('/invoices', InvoiceController.index);
routes.get('/invoices/:id', InvoiceController.show);
routes.post('/invoices', InvoiceController.store);
routes.put('/invoices/:id', InvoiceController.update);
routes.delete('/invoices/:id', InvoiceController.destroy);

routes.get('/items', ItemController.index);
routes.post('/items', ItemController.store);
routes.delete('/items/:id', ItemController.destroy);

routes.post('/movimentations/transfer', MovimentationController.store);

routes.post('/movimentations/income', MovimentationIncomeController.store);
routes.post('/movimentations/outcome', MovimentationOutcomeController.store);
routes.get('/movimentations/income/month', MovimentationIncomeController.index);
routes.get('/movimentations/outcome/month', MovimentationOutcomeController.index);

routes.get('/movimentations/month', MovimentationMonthController.index);
routes.get('/movimentations/year', MovimentationYearController.index);

routes.get('/movimentations/company', MovimentationCompanyController.index);
routes.get('/movimentations/category/month', MovimentationCategoryMonthController.index);
routes.get('/movimentations/category/year', MovimentationCategoryYearController.index);

routes.get('/movimentations', MovimentationController.index);
routes.get('/movimentations/:id', MovimentationController.show);
routes.put('/movimentations/:id', MovimentationController.update);
routes.delete('/movimentations/:id', MovimentationController.destroy);

routes.get('/profits', ProfitController.index);
routes.post('/profits', ProfitController.store);
routes.delete('/profits/:id', ProfitController.destroy);

routes.get('/targets', TargetController.index);
routes.get('/targets/:id', TargetController.show);
routes.post('/targets', TargetController.store);
routes.put('/targets/:id', TargetController.update);
routes.delete('/targets/:id', TargetController.destroy);

module.exports = routes;