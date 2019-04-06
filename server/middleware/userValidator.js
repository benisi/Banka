import user from '../database/user';
import validator from '../helper/validator';

class UserValidator {
  static signUpValidator(req, res, next) {
    const {
      firstName, lastName, email, password, isAdmin, type
    } = req.body;
    if (validator.isUndefined(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name field is required'
      });
    }
    if (!validator.isString(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name must be a string'
      });
    }
    if (validator.isEmpty(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name should not be empty'
      });
    }
    if (!validator.itIsAName(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid first name'
      });
    }
    // last name validating
    if (validator.isUndefined(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name field is required'
      });
    }
    if (!validator.isString(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name must be a string'
      });
    }
    if (validator.isEmpty(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name should not be empty'
      });
    }
    if (!validator.itIsAName(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid last name'
      });
    }
    if (validator.isEmpty(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email should not be empty'
      });
    }
    if (validator.isUndefined(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email field is required'
      });
    }
    const users = user.findAll();
    if (users.find(entry => entry.email === email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email already exist'
      });
    }
    if (!validator.isString(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email must be a string'
      });
    }
    if (!validator.itIsAnEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email address'
      });
    }
    if (!validator.itIsBoolean(isAdmin)) {
      return res.status(400).json({
        status: 400,
        error: 'isAdmin must be boolean'
      });
    }
    if (!['client', 'staff'].includes(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid type, only accept [ staff, client ]'
      });
    }
    if (!validator.isPassword(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit'
      });
    }
    next();
  }

  static signInValidator(req, res, next) {
    const users = user.findAll();
    const foundUser = users.find(entry => entry.email === req.body.email.trim());
    if (!foundUser || !validator.checkPassword(req.body.password, foundUser.password)) {
      return res.status(403).json({
        status: 403,
        error: 'Wrong email and password combination'
      });
    }
    req.body.foundUser = foundUser;
    next();
  }
}

export default UserValidator;
