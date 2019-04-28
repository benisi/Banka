import bcrypt from 'bcrypt-nodejs';
import User from '../database/sqlUser';
import auth from '../helpers/auth';
import validator from '../helpers/validator';
import Account from '../database/sqlAccount';
import Response from '../helpers/Response';

class UserController {
  static async create(req, res) {
    const {
      email, firstName, lastName,
      stateOfResidence, phoneNumber, password, dateOfBirth, sex,
    } = req.body;

    const params = [
      email.toLowerCase(),
      firstName,
      lastName,
      bcrypt.hashSync(password),
      stateOfResidence,
      phoneNumber,
      dateOfBirth,
      sex,
    ];
    try {
      const createdUser = await User.init().insert(params);
      const { id, type, isadmin: isAdmin } = createdUser.rows[0];
      const token = auth.createToken({ id, type, isAdmin: isAdmin || false });
      const { password: pass, ...data } = createdUser.rows[0];
      data.token = token;
      return Response.success(res, 201, [data]);
    } catch (error) {
      if (error.code === '23505') {
        return Response.error(res, 409, 'Email already exist');
      }
      return Response.error500(res);
    }
  }

  // eslint-disable-next-line consistent-return
  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const queryData = await User.init().findWhere(['email'], [email.toLowerCase()]);
      if (queryData.rowCount < 1) {
        return Response.error(res, 401, 'Wrong email and password combination');
      }
      const hashPassword = queryData.rows[0].password;
      if (!validator.checkPassword(password, hashPassword)) {
        return Response.error(res, 401, 'Wrong email and password combination');
      }
      const { password: pass, ...data } = queryData.rows[0];
      data.token = auth.createToken({ id: data.id, type: data.type, isAdmin: data.isAdmin });
      return Response.success(res, 200, [data]);
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async getUserAccounts(req, res) {
    const { userEmail } = req.params;
    const { id: requesterId } = req.body;
    let userAccounts;
    let accountOwner;
    try {
      accountOwner = await User.init().findWhere(['email'], userEmail);
      if (accountOwner.rowCount < 1) {
        return Response.error(res, 404, 'The data you are looking for cannot be found');
      }
      userAccounts = await Account.init().findWhere(['owner'], accountOwner.rows[0].id);

      if (userAccounts.rowCount > 0) {
        if (parseInt(userAccounts.rows[0].owner, 10) !== parseInt(requesterId, 10)) {
          return Response.error(res, 403, 'You don\'t have the permission to view this data');
        }
        const data = userAccounts.rows;
        return Response.success(res, 200, data);
      }
      return Response.error(res, 404, 'You don\'t have an account yet');
    } catch (error) {
      return Response.error500(res);
    }
  }

  static async adminCreateAccount(req, res) {
    const {
      email, firstName, lastName,
      stateOfResidence, phoneNumber, password, dateOfBirth,
      sex, isSuperAdmin,
    } = req.body;

    const params = [
      email.toLowerCase(),
      firstName,
      lastName,
      bcrypt.hashSync(password),
      stateOfResidence,
      phoneNumber,
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
      return Response.success(res, 201, data);
    } catch (error) {
      if (error.code === '23505') {
        return Response.error(res, 409, 'Email already exist');
      }
      return Response.error500(res);
    }
  }
}

export default UserController;
