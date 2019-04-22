const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');


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

const createUserTable = () => pool.query(createUsersTableQuery);

const createAccountTableQuery = `CREATE TABLE IF NOT EXISTS accounts(
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

const createAccountTable = () => pool.query(createAccountTableQuery);

const createAccountTrackingTableQuery = `CREATE TABLE IF NOT EXISTS trackings (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  type CHARACTER VARYING(7) NOT NULL
)`;

const createAccountTrackingTable = () => pool.query(createAccountTrackingTableQuery);

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

const createTransactionTable = () => pool.query(createTransactionTableQuery);
const defaultAdmin = [
  'admin@gmail.com',
  'Benjamin',
  'Isidahomen',
  bcrypt.hashSync('adminpass1', 10),
  'edo',
  '07035361846',
  'sir',
  '02/09/1960',
  'male',
  'staff',
  true,
];
const createAdminUserQuery = 'INSERT INTO users(email,firstname,lastname,password,stateofresidence,phonenumber,title, dateofbirth, sex, type, isadmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';

const createAdminUser = () => pool.query(createAdminUserQuery, defaultAdmin);

const createAllTables = () => {
  createUserTable()
    .then(() => createAccountTable())
    .then(() => createAccountTrackingTable())
    .then(() => createTransactionTable())
    .then(() => {
      createAdminUser().then(() => {
        pool.end();
      }).catch((err) => {
        pool.end();
        throw new Error(err);
      });
    });
};

module.exports = {
  createUserTable,
  createAccountTable,
  createTransactionTable,
  createAccountTrackingTable,
  createAllTables,
};

require('make-runnable');
