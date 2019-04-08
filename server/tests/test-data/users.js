const validUser = {
  email: 'bisidahomen222@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hfh3hfhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const emptyEmail = {
  email: '',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hfhh3fhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const invalidEmail = {
  email: 'benjamin.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hfhhf3hfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const undefineEmail = {
  email: undefined,
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hf3hhfhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const alreadyInUseUser = {
  email: 'bisidahomen@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hfhhfhf3hfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const nonStringEmail = {
  email: 12344,
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'hf3hhfhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

// eslint-disable-next-line import/prefer-default-export

// first name mock data
const emptyFirstName = {
  email: 'bisidahomen33@gmail.com',
  firstName: '',
  lastName: 'Isidahomen',
  password: 'hfh3hfhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const invalidFirstName = {
  email: 'bisidahomen15@gmail.com',
  firstName: 'ben@3#',
  lastName: 'Isidahomen',
  password: 'hfhh3fhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const undefineFirstName = {
  email: 'bisidahomen16@gmail.com',
  firstName: undefined,
  lastName: 'Isidahomen',
  password: 'hfhhfh3fhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const nonStringFirstName = {
  email: 'bisidahomen11@gmail.com',
  firstName: 1234,
  lastName: 'Isidahomen',
  password: 'hfhh3fhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

// last name mock data
const emptyLastName = {
  email: 'bisidahomen3@gmail.com',
  firstName: 'Isidahomen',
  lastName: '',
  password: 'hfhhfhf3hfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const invalidLastName = {
  email: 'bisidahomen5@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'Isidahomen@54',
  password: 'hfhhf3hfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const undefineLastName = {
  email: 'bisidahomen6@gmail.com',
  firstName: 'Isidahomen',
  lastName: undefined,
  password: 'hfhhfhf3hfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const nonStringLastName = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 12345,
  password: 'hfh3hfhfhfh',
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const invalidIsAdmin = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: 'hfhhfhfhfh3',
  type: 'client',
  isAdmin: 'true',
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const invalidType = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: 'hfhhfhfh3fh',
  type: 'guess',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};

const invalidPassword = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: '_hfhhfhfhfh3',
  type: 'client',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
};
const validLoginData = {
  email: 'bisidahomen@gmail.com',
  password: 'hfhh5fhfhfh'
};
const invalidLoginData = {
  email: 'doe@gmail.com',
  password: 'ytyttyty4'
};

export {
  validUser, emptyEmail, invalidEmail, undefineEmail, alreadyInUseUser,
  nonStringEmail, emptyFirstName, invalidFirstName, undefineFirstName,
  nonStringFirstName, emptyLastName, invalidLastName, undefineLastName,
  nonStringLastName, invalidIsAdmin, invalidType, invalidPassword,
  validLoginData, invalidLoginData
};
