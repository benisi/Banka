import sqlModel from './sqlModel';

class User extends sqlModel {}

const structure = [
  'email',
  'firstName',
  'lastName',
  'password',
  'stateOfResidence',
  'phoneNumber',
  'title',
  'dateOfBirth',
  'sex',
];

const ClientUser = new User(structure);
const AdminUser = new User([...structure, 'type', 'isAdmin']);

export { ClientUser, AdminUser };
