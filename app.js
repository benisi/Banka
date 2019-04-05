/* jslint es6 */
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/router';

const app = express();
const PORT = 3000;

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});

app.use(router);

app.get('/', (req, resp) => resp.status(200).json({ message: 'Hello there, Welcome to Banka' }));

export default app;
