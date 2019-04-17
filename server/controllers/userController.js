import bcrypt from 'bcrypt';
import pool from '../database/dbConnection';
import { createUser } from '../database/sqlQueries';
import user from '../database/user';
import auth from '../helpers/auth';
import validator from '../helpers/validator';

class UserController {
  static create(req, res) {
    const {
      email, firstName, lastName,
      stateOfResidence, phoneNumber, title, password, dateOfBirth, sex
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
      sex
    ];

    pool.query(createUser, params)
      .then((queryData) => {
        const createdUser = queryData.rows[0];
        const { id, type, isAdmin } = createdUser;
        const token = auth.createToken({ id, type, isAdmin });
        const { password: pass, ...data } = createdUser;
        data.token = token;
        return res.status(201).json({
          status: 201,
          data: [data]
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === '23505') {
          return res.status(409)
            .send({
              status: 409,
              error: 'Email already exist'
            });
        }
        return res.status(500)
          .send({
            status: 500,
            error: 'Something went wrong'
          });
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
