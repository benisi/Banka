"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var connect = {
  connectionString: process.env.DATABASE_URL_TEST
};
var pool = new Pool(connect);
var createUsersTableQuery = "CREATE TABLE IF NOT EXISTS users (\n  id BIGSERIAL PRIMARY KEY NOT NULL,\n  firstName CHARACTER VARYING(50) NOT NULL,\n  type CHARACTER VARYING(7) NOT NULL,\n  stateOfOrigin CHARACTER VARYING(50) NOT NULL,\n  phoneNumber CHARACTER VARYING(50) NOT NULL,\n  title CHARACTER VARYING(50) NOT NULL,\n  sex CHARACTER VARYING(6) NOT NULL,\n  dateOfBirth DATE NOT NULL,\n  isAdmin BOOLEAN NOT NULL,\n  lastName CHARACTER VARYING(50) NOT NULL,\n  email CHARACTER VARYING(100) UNIQUE NOT NULL,\n  password CHARACTER VARYING(255) NOT NULL\n)";

var createUserTable = function createUserTable() {
  pool.query(createUsersTableQuery).then(function (result) {
    console.log("usersTable: ".concat(result.command, "ED"));
    pool.end();
  })["catch"](function (error) {
    console.log("users table ".concat(error));
    pool.end();
  });
};

var createAccountTableQuery = "CREATE TABLE IF NOT EXISTS accounts(\n  id BIGSERIAL PRIMARY KEY NOT NULL,\n  type CHARACTER VARYING(7) NOT NULL,\n  status CHARACTER VARYING(6) NOT NULL,\n  balance FLOAT(2) NOT NULL,\n  category CHARACTER VARYING(13) NOT NULL,\n  createdOn TIMESTAMP NOT NULL,\n  owner INTEGER NOT NULL,\n  FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE\n)";

var createAccountTable = function createAccountTable() {
  pool.query(createAccountTableQuery).then(function (result) {
    console.log("AccountsTable: ".concat(result.command, "ED"));
    pool.end();
  })["catch"](function (error) {
    console.log("accounts table ".concat(error));
    pool.end();
  });
};

var createTransactionTableQuery = "CREATE TABLE IF NOT EXISTS transactions (\n  id BIGSERIAL PRIMARY KEY NOT NULL,\n  type CHARACTER VARYING(7) NOT NULL,\n  createdOn TIMESTAMP NOT NULL,\n  cashier INTEGER NOT NULL,\n  accountNumber INTEGER NOT NULL,\n  oldBalance FLOAT(2) NOT NULL,\n  newBalance FLOAT(2) NOT NULL,\n  FOREIGN KEY (cashier) REFERENCES users (id) ON DELETE CASCADE\n)";

var createTransactionTable = function createTransactionTable() {
  pool.query(createTransactionTableQuery).then(function (result) {
    console.log("transactions Table: ".concat(result.command, "ED"));
    pool.end();
  })["catch"](function (error) {
    console.log("transactions table ".concat(error));
    pool.end();
  });
};

module.exports = {
  createUserTable: createUserTable,
  createAccountTable: createAccountTable,
  createTransactionTable: createTransactionTable
};

require('make-runnable');