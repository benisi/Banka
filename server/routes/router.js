import express from 'express';
import UserController from '../controllers/v1/UserController';
import AccountController from '../controllers/v1/AccountController';
import TransactionController from '../controllers/v1/TransactionController';
import userValidator from '../middleware/userValidator';
import accountValidator from '../middleware/accountValidator';
import auth from '../helper/auth';

// Router middleware

const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', userValidator.signUp, UserController.create);
router.post('/api/v1/auth/signin', userValidator.signIn, UserController.signIn);

// Bank account route
router.post('/api/v1/accounts', [auth.verifyToken, accountValidator.create], AccountController.create);
router.patch('/api/v1/account/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff, accountValidator.status], AccountController.status);
router.delete('/api/v1/accounts/:accountNumber', [auth.verifyToken, auth.allowOnlyAdminStaff, accountValidator.delete], AccountController.delete);

// Transaction route
router.post('/api/v1/transactions/:accountNumber/credit', [auth.verifyToken], TransactionController.credit);

export default router;
