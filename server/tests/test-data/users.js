import bcrypt from 'bcrypt';

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
  true
];
const defaultTestClient = [
  'client@gmail.com',
  'Benjamin',
  'Isidahomen',
  bcrypt.hashSync('clientpass1', 10),
  'edo',
  '07035361846',
  'sir',
  '02/09/1960',
  'male',
  'client',
  false
];

const defaultUser = {
  email: 'admin@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: bcrypt.hashSync('adminpass1', 10),
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
const defaultClient = {
  email: 'user@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: bcrypt.hashSync('clientpass1', 10),
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
const validUser = {
  email: 'admin@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'adminpass1',
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  title: 'master',
  dateOfBirth: '02/09/1960',
  sex: 'male'
};

const validUser1 = {
  email: 'admin33@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: 'adminpass1',
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  title: 'master',
  dateOfBirth: '02/09/1960',
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
  email: 'user@gmail.com',
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
  email: 'user33@gmail.com',
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
  email: 'user15@gmail.com',
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
  email: 'user16@gmail.com',
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
  email: 'user11@gmail.com',
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
  email: 'user3@gmail.com',
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
  email: 'user5@gmail.com',
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
  email: 'user6@gmail.com',
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
  email: 'user8@gmail.com',
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
  email: 'user8@gmail.com',
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
  email: 'user8@gmail.com',
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
  email: 'user8@gmail.com',
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
  email: 'user8@gmail.com',
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
const invalidDateOfBirth = {
  email: 'user8@gmail.com',
  firstName: 'Isidahomen',
  lastName: 'ben',
  password: 'hfhhfhfhfh3',
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09',
  title: 'master',
  sex: 'male'
};
const invalidSex = {
  email: 'user8@gmail.com',
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
  email: 'admin@gmail.com',
  password: 'adminpass1'
};
const adminLoginData = {
  email: 'admin@gmail.com',
  password: 'adminpass1'
};
const clientLoginData = {
  email: 'client@gmail.com',
  password: 'clientpass1'
};
const invalidLoginData = {
  email: 'doe@gmail.com',
  password: 'clientpass1'
};
const undefinedEmailLoginData = {
  email: undefined,
  password: 'clientpass1'
};
const undefinedPasswordLoginData = {
  email: 'doe@gmail.com',
  password: undefined
};

export {
  validUser, emptyEmail, invalidEmail, undefineEmail, alreadyInUseUser,
  nonStringEmail, emptyFirstName, invalidFirstName, undefineFirstName,
  nonStringFirstName, emptyLastName, invalidLastName, undefineLastName,
  nonStringLastName, invalidIsAdmin, invalidType, invalidPassword,
  validLoginData, invalidLoginData, defaultUser, invalidPhoneNumber, validUser1,
  invalidSex, clientLoginData, adminLoginData, defaultClient, invalidDateOfBirth,
  undefinedEmailLoginData, undefinedPasswordLoginData, defaultAdmin, defaultTestClient
};
