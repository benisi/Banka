import user from './createUser';
import account from './createAccount';
import transaction from './createTransaction';

user.createTable()
  .then(() => account.createTable())
  .then(() => transaction.createTable())
  .then(() => user.mockDatabase())
  .then(() => user.mockClient())
  .catch((error) => {
    console.log(error);
  });
