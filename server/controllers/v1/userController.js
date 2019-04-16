import bcrypt from 'bcrypt';
import user from '../../database/user';
import auth from '../../helpers/auth';
import validator from '../../helpers/validator';

class UserController {
  static create(req, res) {
    const { email } = req.body;
    const users = user.findAll();
    if (users.find(entry => entry.email === email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email already exist'
      });
    }
    const userObj = req.body;
    userObj.password = bcrypt.hashSync(req.body.password, 10);
    userObj.isAdmin = false;
    userObj.type = 'client';
    const refData = user.create(userObj);
    if (refData) {
      const { password, ...data } = refData;
      data.token = auth.createToken({ id: data.id, type: data.type, isAdmin: data.isAdmin });
      return res.status(201).json({
        status: 201,
        data,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'User validation error'
    });
  }

  static signIn(req, res) {
    const users = user.findAll();
    const { email, password } = req.body;
    const foundUser = users.find(entry => entry.email === email.trim());
    if (!foundUser || !validator.checkPassword(password, foundUser.password)) {
      return res.status(401).json({
        status: 401,
        error: 'Wrong email and password combination'
      });
    }
    const { password: pass, ...data } = foundUser;
    data.token = auth.createToken({ id: data.id, type: data.type, isAdmin: data.isAdmin });
    return res.status(200).json({
      status: 200,
      data
    });
  }
}

export default UserController;
