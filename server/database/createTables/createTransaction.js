import pool from '../DBconnection';

const createTransactionTable = `CREATE TABLE IF NOT EXISTS transactions (
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
      .then(result => console.log(`transactions Table: ${result.command}ED`))
      .catch(error => console.log(`transactions table ${error}`));
    return create;
  }
}

export default TransactionsTableHandler;
