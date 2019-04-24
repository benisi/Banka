import bcrypt from 'bcrypt-nodejs';
import User from '../database/sqlUser';
import auth from '../helpers/auth';
import validator from '../helpers/validator';
import Account from '../database/sqlAccount';

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
      bcrypt.hashSync(password),
      stateOfResidence,
      phoneNumber,
      title,
      dateOfBirth,
      sex,
    ];
    try {
      const createdUser = await User.init().insert(params);
      const { id, type, isadmin: isAdmin } = createdUser.rows[0];
      const token = auth.createToken({ id, type, isAdmin: isAdmin || false });
      const { password: pass, ...data } = createdUser.rows[0];
      data.token = token;
      return res.status(201).json({
        status: 201,
        data: [data],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409)
          .send({
            status: 409,
            error: 'Email already exist',
          });
      }
      return res.status(500)
        .send({
          status: 500,
          error: 'Something went wrong',
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

  static async getUserAccounts(req, res) {
    const { userEmail } = req.params;
    const { id: requesterId } = req.body;
    let userAccounts;
    let accountOwner;
    try {
      accountOwner = await User.init().findWhere(['email'], userEmail);
      if (accountOwner.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'The data you are looking for cannot be found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    try {
      userAccounts = await Account.init().findWhere(['owner'], accountOwner.rows[0].id);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
    if (userAccounts.rowCount > 0) {
      if (parseInt(userAccounts.rows[0].owner, 10) !== parseInt(requesterId, 10)) {
        return res.status(403).json({
          status: 403,
          error: 'You dont have the permission to view this data',
        });
      }
      const data = userAccounts.rows;
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'You don\'t have an Account yet',
    });
  }

  static async adminCreateAccount(req, res) {
    const {
      email, firstName, lastName,
      stateOfResidence, phoneNumber, title, password, dateOfBirth,
      sex, isSuperAdmin,
    } = req.body;

    const params = [
      email,
      firstName,
      lastName,
      bcrypt.hashSync(password),
      stateOfResidence,
      phoneNumber,
      title,
      dateOfBirth,
      sex,
      'staff',
      isSuperAdmin,
    ];
    try {
      const createdUser = await User.init('admin').insert(params);
      const { id, type, isAdmin } = createdUser.rows[0];
      const token = auth.createToken({ id, type, isAdmin });
      const { password: pass, ...data } = createdUser.rows[0];
      data.token = token;
      return res.status(201).json({
        status: 201,
        data: [data],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409)
          .send({
            status: 409,
            error: 'Email already exist',
          });
      }
      return res.status(500)
        .send({
          status: 500,
          error: 'Something went wrong',
        });
    }
  }
}

export default UserController;
