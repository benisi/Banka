import Model from './model';
import { defaultUser, defaultClient } from '../tests/test-data/users';

class User extends Model {

}

const structure = {
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  type: String,
  isAdmin: Boolean,
  stateOfResidence: String,
  phoneNumber: String,
  title: String,
  dateOfBirth: String,
  sex: String
};

const user = new User(structure);

user.create(defaultUser);
user.create(defaultClient);

export default user;
