import express from 'express';
import UserController from '../controllers/v1/UserController';
import AccountController from '../controllers/v1/AccountController';
import TransactionController from '../controllers/v1/TransactionController';
import userValidator from '../middleware/userValidator';
import accountValidator from '../middleware/accountValidator';
import auth from '../helper/auth';
import transactionValidator from '../middleware/transactionValidator';

// Router middleware

const router = express.Router();

router.get('/', (req, resp) => resp.status(200).json({ message: 'Hello there, Welcome to Banka' }));

// User Auth Routes
router.post('/api/v1/auth/signup', userValidator.signUp, UserController.create);
router.post('/api/v1/auth/signin', userValidator.signIn, UserController.signIn);

// Bank account route
router.post('/api/v1/accounts', [auth.verifyToken, accountValidator.create], AccountController.create);
router.patch('/api/v1/account/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff, accountValidator.status], AccountController.status);
router.delete('/api/v1/accounts/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff, accountValidator.delete], AccountController.delete);

// Transaction route
router.post('/api/v1/transactions/:accountNumber/credit', [auth.verifyToken, auth.allowOnlyStaff, transactionValidator], TransactionController.credit);
router.post('/api/v1/transactions/:accountNumber/debit', [auth.verifyToken, auth.allowOnlyStaff, transactionValidator], TransactionController.debit);

router.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The end point you are looking for cannot be found, kindly contact webmaster if you think this is an error'
}));

export default router;
