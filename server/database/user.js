import bcrypt from 'bcrypt';
import Model from './model';

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
  dateOfBirth: String
};

const user = new User(structure);

user.create({
  email: 'bisidahomen@gmail.com',
  firstName: 'Benjamin',
  lastName: 'Isidahomen',
  password: bcrypt.hashSync('hfhh5fhfhfh', 10),
  type: 'client',
  isAdmin: false,
  stateOfResidence: 'edo',
  phoneNumber: '07035361846',
  dateOfBirth: '02/09/1960',
  title: 'master'
});

export default user;
