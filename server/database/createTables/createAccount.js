import pool from '../DBconnection';

const createAccountTable = `CREATE TABLE IF NOT EXISTS accounts(
        id BIGSERIAL PRIMARY KEY NOT NULL,
        type CHARACTER VARYING(7) NOT NULL,
        status CHARACTER VARYING(6) NOT NULL,
        balance FLOAT(2) NOT NULL,
        category CHARACTER VARYING(13) NOT NULL,
        createdOn TIMESTAMP NOT NULL,
        owner INTEGER NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
    )`;

class AccountsTableHandler {
  static createTable() {
    const create = pool.query(createAccountTable)
      .then(result => console.log(`AccountsTable: ${result.command}ED`))
      .catch(error => console.log(`accounts table ${error}`));
    return create;
  }
}

export default AccountsTableHandler;
