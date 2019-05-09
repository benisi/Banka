import SqlModel from './sqlModel';

class User extends SqlModel {
  static init(type = 'client') {
    let structure = [
      '"email"',
      '"firstName"',
      '"lastName"',
      '"password"',
      '"stateOfResidence"',
      '"phoneNumber"',
      '"dateOfBirth"',
      '"sex"',
    ];

    if (type === 'admin') {
      structure = [...structure, '"type"', '"isAdmin"'];
    }
    return new User(structure);
  }
}

export default User;
