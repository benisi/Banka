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
  isAdmin: Boolean
};

const user = new User(structure);
user.create({
  email: 'bisidahomen@gmail.com', firstName: 'Benjamin', lastName: 'Isidahomen', password: bcrypt.hashSync('hfhh5fhfhfh', 10), type: 'client', isAdmin: false
});

export default user;
