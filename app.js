/* jslint es6 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './server/routes/router';

const app = express();
dotenv.config();
// logger middleware
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: '*',
  credentials: true
};

// adding cors middleware
app.use(cors(corsOptions));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});

app.use(router);

export default app;
