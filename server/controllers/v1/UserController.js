import bcrypt from 'bcrypt';
import user from '../../database/user';
import auth from '../../helper/auth';

class UserController {
  static create(req, res) {
    const userObj = req.body;
    userObj.password = bcrypt.hashSync(req.body.password, 10);
    userObj.isAdmin = false;
    userObj.type = 'client';
    const refData = user.create(userObj);
    if (refData) {
      const { password, ...data } = refData;
      data.token = auth.createToken({ id: data.id });
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
    const { password, ...data } = req.body.foundUser;
    data.token = auth.createToken({ id: data.id });
    return res.status(200).json({
      status: 200,
      data
    });
  }
}

export default UserController;
