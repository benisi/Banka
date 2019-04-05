import bcrypt from 'bcrypt';
import user from '../../database/data-storage';
import auth from '../../helper/auth';

class UserController {
  static createUser(req, res) {
    const userObj = req.body;
    userObj.password = bcrypt.hashSync(req.body.password, 10);
    const data = user.create(userObj);
    if (data) {
      data.token = auth.createToken(data.id);
      delete data.password;
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
}

export default UserController;
