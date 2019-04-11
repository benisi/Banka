import bcrypt from 'bcrypt';

const defaultUser = {
  email: 'bisidahomen@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: bcrypt.hashSync('hfhh5fhfhfh', 10),
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
const defaultClient = {
  email: 'bisidahomen999@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: bcrypt.hashSync('hfhh5fhfhfh', 10),
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
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
  title: 'master',
  sex: 'male'
};
const invalidPhoneNumber = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: 'hfhhfhfhfh3',
  type: 'client',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361uiio',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
const invalidSex = {
  email: 'bisidahomen8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: 'hfhhfhfhfh3',
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'mammal'
};
const validLoginData = {
  email: 'bisidahomen@gmail.com',
  password: 'hfhh5fhfhfh'
};
const adminLoginData = {
  email: 'bisidahomen@gmail.com',
  password: 'adminpass1'
};
const clientLoginData = {
  email: 'bisidahomen999@gmail.com',
  password: 'hfhh5fhfhfh'
};
const invalidLoginData = {
  email: 'doe@gmail.com',
  password: 'clientpass1'
};

export {
  validUser, emptyEmail, invalidEmail, undefineEmail, alreadyInUseUser,
  nonStringEmail, emptyFirstName, invalidFirstName, undefineFirstName,
  nonStringFirstName, emptyLastName, invalidLastName, undefineLastName,
  nonStringLastName, invalidIsAdmin, invalidType, invalidPassword,
  validLoginData, invalidLoginData, defaultUser, invalidPhoneNumber,
  invalidSex, clientLoginData, adminLoginData, defaultClient
};
