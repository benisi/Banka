import bcrypt from 'bcrypt';
import User from '../database/sqlUser';
import auth from '../helpers/auth';
import validator from '../helpers/validator';

class UserController {
  static async create(req, res) {
    const {
      email, firstName, lastName,
      stateOfResidence, phoneNumber, title, password, dateOfBirth, sex,
    } = req.body;

    const params = [
      email,
      firstName,
      lastName,
      bcrypt.hashSync(password, 10),
      stateOfResidence,
      phoneNumber,
      title,
      dateOfBirth,
      sex,
    ];
    try {
      const userInstances = User.init();
      const createdUser = await userInstances.insert(params);
      const { id, type, isAdmin } = createdUser.rows[0];
      const token = auth.createToken({ id, type, isAdmin });
      const { password: pass, ...data } = createdUser.rows[0];
      data.token = token;
      return res.status(201).json({
        status: 201,
        data: [data],
      });
    } catch (error) {
      return res.status(409)
        .send({
          status: 409,
          error: 'Email already exist',
        });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const queryData = await User.init().findWhere(['email'], [email]);
      if (queryData.rowCount < 1) {
        return res.status(401).json({
          status: 401,
          error: 'Wrong email and password combination',
        });
      }
      const hashPassword = queryData.rows[0].password;
      if (!validator.checkPassword(password, hashPassword)) {
        return res.status(401).json({
          status: 401,
          error: 'Wrong email and password combination',
        });
      }
      const { password: pass, ...data } = queryData.rows[0];
      data.token = auth.createToken({ id: data.id, type: data.type, isAdmin: data.isAdmin });
      return res.status(200).json({
        status: 200,
        data: [data],
      });
    } catch (error) {
      res.send({
        status: 500,
        error: 'something went wrong',
      });
    }
    return null;
  }
}

export default UserController;
