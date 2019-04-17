const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connect = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(connect);

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  firstName CHARACTER VARYING(50) NOT NULL,
  type CHARACTER VARYING(7) NOT NULL,
  stateOfOrigin CHARACTER VARYING(50) NOT NULL,
  phoneNumber CHARACTER VARYING(50) NOT NULL,
  title CHARACTER VARYING(50) NOT NULL,
  sex CHARACTER VARYING(6) NOT NULL,
  dateOfBirth DATE NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  lastName CHARACTER VARYING(50) NOT NULL,
  email CHARACTER VARYING(100) UNIQUE NOT NULL,
  password CHARACTER VARYING(255) NOT NULL
)`;

const createUserTable = () => {
  pool.query(createUsersTableQuery)
    .then((result) => {
      console.log(`usersTable: ${result.command}ED`);
      pool.end();
    })
    .catch((error) => {
      console.log(`users table ${error}`);
      pool.end();
    });
};

const createAccountTableQuery = `CREATE TABLE IF NOT EXISTS accounts(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  type CHARACTER VARYING(7) NOT NULL,
  status CHARACTER VARYING(6) NOT NULL,
  balance FLOAT(2) NOT NULL,
  category CHARACTER VARYING(13) NOT NULL,
  createdOn TIMESTAMP NOT NULL,
  owner INTEGER NOT NULL,
  FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
)`;

const createAccountTable = () => {
  pool.query(createAccountTableQuery)
    .then((result) => {
      console.log(`AccountsTable: ${result.command}ED`);
      pool.end();
    })
    .catch((error) => {
      console.log(`accounts table ${error}`);
      pool.end();
    });
};

const createTransactionTableQuery = `CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  type CHARACTER VARYING(7) NOT NULL,
  createdOn TIMESTAMP NOT NULL,
  cashier INTEGER NOT NULL,
  accountNumber INTEGER NOT NULL,
  oldBalance FLOAT(2) NOT NULL,
  newBalance FLOAT(2) NOT NULL,
  FOREIGN KEY (cashier) REFERENCES users (id) ON DELETE CASCADE
)`;

const createTransactionTable = () => {
  pool.query(createTransactionTableQuery)
    .then((result) => {
      console.log(`transactions Table: ${result.command}ED`);
      pool.end();
    })
    .catch((error) => {
      console.log(`transactions table ${error}`);
      pool.end();
    });
};


module.exports = {
  createUserTable, createAccountTable, createTransactionTable
};

require('make-runnable');
