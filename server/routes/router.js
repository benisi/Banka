import express from 'express';
import UserController from '../controllers/v1/UserController';
import userValidator from '../middleware/userValidator';

// Router middleware

const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', userValidator.signUpValidator, UserController.createUser);

export default router;
