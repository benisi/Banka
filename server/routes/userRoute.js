import express from 'express';
import UserController from '../controllers/userController';
import userValidator from '../middlewares/userValidator';
import accountValidator from '../middlewares/accountValidator';
import auth from '../helpers/auth';


// Router middleware

const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', userValidator.signUp, UserController.create);
userRoute.post('/api/v1/auth/signin', userValidator.signIn, UserController.signIn);
userRoute.post('/api/v1/auth/admin/signup', [auth.verifyToken, userValidator.signUp, auth.allowOnlyAdmin, auth.allowOnlySuperAdmin], UserController.adminCreateAccount);
// User restricted route
userRoute.get('/api/v1/user/:userEmail/accounts', [auth.verifyToken, accountValidator.checkForValidEmail], UserController.getUserAccounts);

export default userRoute;
