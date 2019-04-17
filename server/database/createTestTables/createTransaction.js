import pool from '../dbConnection';

const createTransactionTable = `DROP TABLE IF EXISTS transactions CASCADE;
    CREATE TABLE transactions (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        type CHARACTER VARYING(7) NOT NULL,
        createdOn TIMESTAMP NOT NULL,
        cashier INTEGER NOT NULL,
        accountNumber INTEGER NOT NULL,
        oldBalance FLOAT(2) NOT NULL,
        newBalance FLOAT(2) NOT NULL,
        FOREIGN KEY (cashier) REFERENCES users (id) ON DELETE CASCADE
    )`;

class TransactionsTableHandler {
  static createTable() {
    const create = pool.query(createTransactionTable)
      .then(result => console.log(`transactions Table: ${result[0].command}, ${result[1].command}`))
      .catch(error => console.log(`transactions table ${error}`));
    return create;
  }
}

export default TransactionsTableHandler;
