const createUser = 'INSERT INTO users (email, firstName, lastName, password, stateOfResidence, phoneNumber, title, dateOfBirth, sex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

const createUser1 = 'INSERT INTO users (firstName, lastName, password, type, isAdmin, stateOfResidence, phoneNumber, title, dateOfBirth, sex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';


export { createUser, createUser1 };
