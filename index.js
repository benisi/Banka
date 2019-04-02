/* jslint es6 */
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, resp) => {
  resp.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
