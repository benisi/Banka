import user from '../database/user';
import validator from '../helper/validator';

class UserValidator {
  static signUp(req, res, next) {
    const {
      firstName, lastName, email, password, stateOfResidence,
      phoneNumber, dateOfBirth, title, sex
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
    // state of residence
    if (validator.isUndefined(stateOfResidence)) {
      return res.status(400).json({
        status: 400,
        error: 'State of residence field is required'
      });
    }
    if (!validator.isString(stateOfResidence)) {
      return res.status(400).json({
        status: 400,
        error: 'State of residence must be a string'
      });
    }
    if (validator.isEmpty(stateOfResidence)) {
      return res.status(400).json({
        status: 400,
        error: 'State of residence should not be empty'
      });
    }
    if (!validator.itIsAName(stateOfResidence)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid state of residence'
      });
    }
    // title
    if (validator.isUndefined(title)) {
      return res.status(400).json({
        status: 400,
        error: 'Title field is required'
      });
    }
    if (!validator.isString(title)) {
      return res.status(400).json({
        status: 400,
        error: 'Title must be a string'
      });
    }
    if (validator.isEmpty(title)) {
      return res.status(400).json({
        status: 400,
        error: 'Title should not be empty'
      });
    }
    // phone number
    if (validator.isUndefined(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone number field is required'
      });
    }
    if (!validator.isString(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone number must be a string'
      });
    }
    if (validator.isEmpty(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone number should not be empty'
      });
    }
    // date of Birth
    if (validator.isUndefined(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Date of birth field is required'
      });
    }
    if (!validator.isString(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Date of birth must be a string'
      });
    }
    if (validator.isEmpty(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Date of birth should not be empty'
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
    if (password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'password is a required field'
      });
    }
    if (sex === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'sex is a required field'
      });
    }
    if (!['male', 'female'].includes(sex)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid sex, only accept [ male, female ]'
      });
    }
    if (!validator(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid date of birth use mm/dd/yyyy format'
      });
    }
    if (!validator.isPassword(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit'
      });
    }
    if (!validator.isPhoneNumber(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid phone number'
      });
    }
    return next();
  }

  static signIn(req, res, next) {
    const { email, password } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'email is a required field'
      });
    }
    if (password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'password is a required field'
      });
    }
    const users = user.findAll();
    const foundUser = users.find(entry => entry.email === req.body.email.trim());
    if (!foundUser || !validator.checkPassword(req.body.password, foundUser.password)) {
      return res.status(403).json({
        status: 403,
        error: 'Wrong email and password combination'
      });
    }
    req.body.foundUser = foundUser;
    return next();
  }
}

export default UserValidator;
