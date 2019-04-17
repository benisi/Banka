import pool from '../dbTestConnection';

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
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


// Class To Create User Table
class UsersTableHandler {
  static createTable() {
    const create = pool.query(createUsersTable)
      .then(result => console.log(`usersTable: ${result[0].command}, ${result[1].command}`))
      .catch(error => console.log(`users table ${error}`));
    return create;
  }
}

export default UsersTableHandler;
