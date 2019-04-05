import user from '../database/data-storage';

class userValidator {
  static signUpValidator(req, res, next) {
    const {
      firstName, lastName, email, password, isAdmin, type
    } = req.body;
    if (firstName === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'First name field is required'
      });
    }
    if (typeof firstName !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'First name must be a string'
      });
    }
    if (firstName === '') {
      return res.status(400).json({
        status: 400,
        error: 'First name should not be empty'
      });
    }
    // regex from stackoverflow
    // eslint-disable-next-line no-useless-escape
    const nameRegex = /(^[a-z ,.'-]{2,60}$)/i;
    if (!nameRegex.test(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid first name'
      });
    }
    // last name validating
    if (lastName === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Last name field is required'
      });
    }
    if (typeof lastName !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Last name must be a string'
      });
    }
    if (lastName === '') {
      return res.status(400).json({
        status: 400,
        error: 'Last name should not be empty'
      });
    }
    if (!nameRegex.test(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid last name'
      });
    }
    if (email === '') {
      return res.status(400).json({
        status: 400,
        error: 'Email should not be empty'
      });
    }
    if (email === undefined) {
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
    if (typeof email !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Email must be a string'
      });
    }
    // regex from emailregex.com
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email address'
      });
    }
    if (typeof isAdmin !== 'boolean') {
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
    // from regexlib.com
    const passwordRegex = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit'
      });
    }
    next();
  }
}

export default userValidator;
