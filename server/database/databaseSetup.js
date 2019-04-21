const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connect = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(connect);

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  firstName CHARACTER VARYING(50) NOT NULL,
  type CHARACTER VARYING(7) NOT NULL DEFAULT 'client',
  stateOfResidence CHARACTER VARYING(50) NOT NULL,
  phoneNumber CHARACTER VARYING(50) NOT NULL,
  title CHARACTER VARYING(50) NOT NULL,
  sex CHARACTER VARYING(6) NOT NULL,
  dateOfBirth DATE NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT false,
  lastName CHARACTER VARYING(50) NOT NULL,
  email CHARACTER VARYING(100) UNIQUE NOT NULL,
  password CHARACTER VARYING(255) NOT NULL
)`;

const createUserTable = () => {
  pool.query(createUsersTableQuery)
    .then(() => {
      pool.end();
    })
    .catch((error) => {
      pool.end();
      throw error;
    });
};

const createAccountTableQuery = `CREATE TABLE IF NOT EXISTS accounts(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  type CHARACTER VARYING(7) NOT NULL,
  accountNumber INTEGER NOT NULL,
  status CHARACTER VARYING(8) NOT NULL,
  balance FLOAT(2) NOT NULL,
  category CHARACTER VARYING(13) NOT NULL,
  createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
)`;

const createAccountTable = () => {
  pool.query(createAccountTableQuery)
    .then(() => {
      pool.end();
    })
    .catch((error) => {
      pool.end();
      throw error;
    });
};

const createAccountTrackingTableQuery = `CREATE TABLE IF NOT EXISTS trackings (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  type CHARACTER VARYING(7) NOT NULL
)`;

const createAccountTrackingTable = () => {
  pool.query(createAccountTrackingTableQuery).then(() => {
    pool.end();
  })
    .catch((error) => {
      pool.end();
      throw new Error(error);
    });
};

const createTransactionTableQuery = `CREATE TABLE IF NOT EXISTS transactions (
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

const createTransactionTable = () => {
  pool.query(createTransactionTableQuery)
    .then(() => {
      pool.end();
    })
    .catch((error) => {
      pool.end();
      throw error;
    });
};


module.exports = {
  createUserTable, createAccountTable, createTransactionTable, createAccountTrackingTable,
};

require('make-runnable');
