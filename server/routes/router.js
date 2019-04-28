import express from 'express';

// Router middleware

const router = express.Router();

router.get('/', (req, resp) => resp.status(200).json({ message: 'Hello there, Welcome to Banka' }));

router.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The end point you are looking for cannot be found, kindly contact webmaster if you think this is an error',
}));

export default router;
