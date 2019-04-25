import pool from '../dbConnection';
import User from '../sqlUser';
import { defaultAdmin, defaultTestClient } from '../../tests/test-data/users';

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        "firstName" CHARACTER VARYING(50) NOT NULL,
        type CHARACTER VARYING(7) NOT NULL DEFAULT 'client',
        "stateOfResidence" CHARACTER VARYING(50) NOT NULL,
        "phoneNumber" CHARACTER VARYING(50) NOT NULL,
        title CHARACTER VARYING(50) NOT NULL,
        sex CHARACTER VARYING(6) NOT NULL,
        "dateOfBirth" DATE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false,
        "lastName" CHARACTER VARYING(50) NOT NULL,
        email CHARACTER VARYING(100) UNIQUE NOT NULL,
        password CHARACTER VARYING(255) NOT NULL
    )`;


// Class To Create User Table
class UsersTableHandler {
  static createTable() {
    const create = pool.query(createUsersTable)
      .then()
      .catch((error) => {
        throw error;
      });
    return create;
  }

  static mockDatabase() {
    return User.init('admin').insert(defaultAdmin)
      .then()
      .catch((error) => {
        throw error;
      });
  }

  static mockClient() {
    return User.init().insert(defaultTestClient)
      .then()
      .catch((err) => {
        throw err;
      });
  }
}

export default UsersTableHandler;
