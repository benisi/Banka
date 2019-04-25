import user from './createUser';
import account from './createAccount';
import transaction from './createTransaction';
import tracking from './createTracking';

user.createTable()
  .then(() => account.createTable())
  .then(() => transaction.createTable())
  .then(() => user.mockDatabase())
  .then(() => user.mockClient())
  .then(() => tracking.createTable())
  .catch((error) => {
    throw error;
  });
