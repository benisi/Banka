import express from 'express';
import AccountController from '../controllers/accountController';
import accountValidator from '../middlewares/accountValidator';
import auth from '../helpers/auth';

// Router middleware

const accountRoute = express.Router();

// Bank account route
accountRoute.post('/api/v1/accounts', [auth.verifyToken, accountValidator.createAccountValidator], AccountController.create);
accountRoute.patch('/api/v1/account/:accountNumber', [auth.verifyToken, auth.allowOnlyAdmin, accountValidator.getAccountValidtor, accountValidator.accountStatusValidator], AccountController.status);
accountRoute.delete('/api/v1/accounts/:accountNumber', [auth.verifyToken, accountValidator.getAccountValidtor, auth.allowOnlyAdminStaff], AccountController.delete);
accountRoute.get('/api/v1/accounts/:accountNumber', [auth.verifyToken, accountValidator.getAccountValidtor, auth.allowOnlyAdminStaff], AccountController.accountDetails);
accountRoute.get('/api/v1/accounts', [auth.verifyToken, auth.allowOnlyAdminStaff], AccountController.getAllAccounts);

export default accountRoute;
