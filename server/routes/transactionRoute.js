import express from 'express';
import TransactionController from '../controllers/transactionController';
import accountValidator from '../middlewares/accountValidator';
import auth from '../helpers/auth';
import transactionValidator from '../middlewares/transactionValidator';

// Router middleware

const transactionRoute = express.Router();

// User Verifiable route
transactionRoute.get('/api/v1/accounts/:accountNumber/transactions', [auth.verifyToken, accountValidator.getAccountValidtor], TransactionController.getUserTransactions);
transactionRoute.post('/api/v1/transactions/:accountNumber/credit', [auth.verifyToken, auth.allowOnlyStaff, accountValidator.getAccountValidtor, transactionValidator], TransactionController.credit);
transactionRoute.post('/api/v1/transactions/:accountNumber/debit', [auth.verifyToken, auth.allowOnlyStaff, accountValidator.getAccountValidtor, transactionValidator], TransactionController.debit);
transactionRoute.get('/api/v1/transactions/:transactionId', [auth.verifyToken, accountValidator.checkForValidId], TransactionController.getSingleTransaction);

export default transactionRoute;
