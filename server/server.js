/* jslint es6 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerYalm from '../docs/swagger.json';
import router from './routes/router';

const app = express();
dotenv.config();
// logger middleware
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: '*',
  credentials: true,
};

// adding cors middleware
app.use(cors(corsOptions));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerYalm));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is running on port ${PORT}`);
});

app.use(router);

app.use((err, req, res, next) => {
  if (!err.statusCode === 500) {
    // log error message or send an email to Ben
    return res.status(500).json({
      status: 500,
      message: 'something went wrong',
    });
  }
  return next();
});

export default app;
