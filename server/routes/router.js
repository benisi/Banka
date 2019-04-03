import express from 'express';
import UserController from '../controllers/v1/UserController';

// Router middleware

const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', UserController.createUser);

export default router;
