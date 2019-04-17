"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undefinedPasswordLoginData = exports.undefinedEmailLoginData = exports.invalidDateOfBirth = exports.defaultClient = exports.adminLoginData = exports.clientLoginData = exports.invalidSex = exports.invalidPhoneNumber = exports.defaultUser = exports.invalidLoginData = exports.validLoginData = exports.invalidPassword = exports.invalidType = exports.invalidIsAdmin = exports.nonStringLastName = exports.undefineLastName = exports.invalidLastName = exports.emptyLastName = exports.nonStringFirstName = exports.undefineFirstName = exports.invalidFirstName = exports.emptyFirstName = exports.nonStringEmail = exports.alreadyInUseUser = exports.undefineEmail = exports.invalidEmail = exports.emptyEmail = exports.validUser = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultUser = {
  email: 'admin@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: _bcrypt["default"].hashSync('adminpass1', 10),
  type: 'staff',
  isAdmin: true,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
exports.defaultUser = defaultUser;
var defaultClient = {
  email: 'user@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: _bcrypt["default"].hashSync('clientpass1', 10),
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master',
  sex: 'male'
};
exports.defaultClient = defaultClient;
var validUser = {
  email: 'user222@gmail.com',
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
exports.validUser = validUser;
var emptyEmail = {
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
exports.emptyEmail = emptyEmail;
var invalidEmail = {
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
exports.invalidEmail = invalidEmail;
var undefineEmail = {
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
exports.undefineEmail = undefineEmail;
var alreadyInUseUser = {
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
exports.alreadyInUseUser = alreadyInUseUser;
var nonStringEmail = {
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
}; // eslint-disable-next-line import/prefer-default-export
// first name mock data

exports.nonStringEmail = nonStringEmail;
var emptyFirstName = {
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
exports.emptyFirstName = emptyFirstName;
var invalidFirstName = {
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
exports.invalidFirstName = invalidFirstName;
var undefineFirstName = {
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
exports.undefineFirstName = undefineFirstName;
var nonStringFirstName = {
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
}; // last name mock data

exports.nonStringFirstName = nonStringFirstName;
var emptyLastName = {
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
exports.emptyLastName = emptyLastName;
var invalidLastName = {
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
exports.invalidLastName = invalidLastName;
var undefineLastName = {
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
exports.undefineLastName = undefineLastName;
var nonStringLastName = {
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
exports.nonStringLastName = nonStringLastName;
var invalidIsAdmin = {
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
exports.invalidIsAdmin = invalidIsAdmin;
var invalidType = {
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
exports.invalidType = invalidType;
var invalidPassword = {
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
exports.invalidPassword = invalidPassword;
var invalidPhoneNumber = {
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
exports.invalidPhoneNumber = invalidPhoneNumber;
var invalidDateOfBirth = {
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
exports.invalidDateOfBirth = invalidDateOfBirth;
var invalidSex = {
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
exports.invalidSex = invalidSex;
var validLoginData = {
  email: 'admin@gmail.com',
  password: 'adminpass1'
};
exports.validLoginData = validLoginData;
var adminLoginData = {
  email: 'admin@gmail.com',
  password: 'adminpass1'
};
exports.adminLoginData = adminLoginData;
var clientLoginData = {
  email: 'user@gmail.com',
  password: 'clientpass1'
};
exports.clientLoginData = clientLoginData;
var invalidLoginData = {
  email: 'doe@gmail.com',
  password: 'clientpass1'
};
exports.invalidLoginData = invalidLoginData;
var undefinedEmailLoginData = {
  email: undefined,
  password: 'clientpass1'
};
exports.undefinedEmailLoginData = undefinedEmailLoginData;
var undefinedPasswordLoginData = {
  email: 'doe@gmail.com',
  password: undefined
};
exports.undefinedPasswordLoginData = undefinedPasswordLoginData;