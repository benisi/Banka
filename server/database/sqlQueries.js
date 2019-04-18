const createUser = 'INSERT INTO users (email, firstName, lastName, password, stateOfResidence, phoneNumber, title, dateOfBirth, sex) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

const createAdminUser = 'INSERT INTO users (email, firstName, lastName, password, stateOfResidence, phoneNumber, title, dateOfBirth, sex, type, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';

const loginUser = 'SELECT * FROM users WHERE email=$1';


export { createUser, loginUser, createAdminUser };
