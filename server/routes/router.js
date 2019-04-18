import express from 'express';
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountController';
import TransactionController from '../controllers/transactionController';
import userValidator from '../middlewares/userValidator';
import accountValidator from '../middlewares/accountValidator';
import auth from '../helpers/auth';
import transactionValidator from '../middlewares/transactionValidator';

// Router middleware

const router = express.Router();

router.get('/', (req, resp) => resp.status(200).json({ message: 'Hello there, Welcome to Banka' }));

// User Auth Routes
router.post('/api/v1/auth/signup', userValidator.signUp, UserController.create);
router.post('/api/v1/auth/signin', userValidator.signIn, UserController.signIn);

// Bank account route
router.post('/api/v1/accounts', [auth.verifyToken, accountValidator.createAccountValidator], AccountController.create);
router.patch('/api/v1/account/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff, accountValidator.accountStatusValidator], AccountController.status);
router.delete('/api/v1/accounts/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff], AccountController.delete);

// Transaction route
router.post('/api/v1/transactions/:accountNumber/credit', [auth.verifyToken, auth.allowOnlyStaff, transactionValidator], TransactionController.credit);
router.post('/api/v1/transactions/:accountNumber/debit', [auth.verifyToken, auth.allowOnlyStaff, transactionValidator], TransactionController.debit);

router.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The end point you are looking for cannot be found, kindly contact webmaster if you think this is an error',
}));

export default router;
