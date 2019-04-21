import pool from '../dbConnection';

const createTransactionTable = `DROP TABLE IF EXISTS transactions CASCADE;
    CREATE TABLE transactions (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        type CHARACTER VARYING(7) NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        cashier INTEGER NOT NULL,
        accountNumber INTEGER NOT NULL,
        amount FLOAT(2) NOT NULL,
        owner INTEGER NOT NULL,
        oldBalance FLOAT(2) NOT NULL,
        newBalance FLOAT(2) NOT NULL,
        FOREIGN KEY (cashier) REFERENCES users (id)
    )`;

class TransactionsTableHandler {
  static createTable() {
    const create = pool.query(createTransactionTable)
      .then()
      .catch((error) => {
        throw error;
      });
    return create;
  }
}

export default TransactionsTableHandler;
