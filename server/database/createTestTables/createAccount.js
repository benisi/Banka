import pool from '../dbConnection';

const createAccountTable = `DROP TABLE IF EXISTS accounts CASCADE;
    CREATE TABLE accounts (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        type CHARACTER VARYING(7) NOT NULL,
        accountNumber INTEGER NOT NULL,
        status CHARACTER VARYING(8) NOT NULL,
        balance FLOAT(2) NOT NULL,
        category CHARACTER VARYING(13) NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        owner INTEGER NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
    )`;

class AccountsTableHandler {
  static createTable() {
    const create = pool.query(createAccountTable)
      .then()
      .catch((error) => {
        throw error;
      });
    return create;
  }
}

export default AccountsTableHandler;
