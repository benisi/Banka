
import validator from '../helpers/validator';

class UserValidator {
  static signUp(req, res, next) {
    const {
      firstName, lastName, email, password, stateOfResidence,
      phoneNumber, dateOfBirth, title, sex,
    } = req.body;
    if (validator.isUndefined(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name field is required',
      });
    }
    if (!validator.isString(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'First name must be a string',
      });
    }
    if (!validator.itIsAName(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid first name, it must only contain alphabet, (,.\'-) special characters and no white space',
      });
    }
    if (validator.isUndefined(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name field is required',
      });
    }
    if (!validator.isString(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name must be a string',
      });
    }
    if (!validator.itIsAName(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid last name',
      });
    }
    if (validator.isUndefined(stateOfResidence)) {
      return res.status(400).json({
        status: 400,
        error: 'State of residence field is required',
      });
    }
    if (typeof stateOfResidence !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'State of residence must be a string',
      });
    }
    if (validator.isUndefined(title)) {
      return res.status(400).json({
        status: 400,
        error: 'Title field is required',
      });
    }
    if (!validator.isString(title)) {
      return res.status(400).json({
        status: 400,
        error: 'Title must be a string',
      });
    }
    if (validator.isUndefined(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone number field is required',
      });
    }
    if (!validator.isString(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone number must be a string',
      });
    }
    if (validator.isUndefined(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Date of birth field is required',
      });
    }
    if (!validator.isString(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Date of birth must be a string',
      });
    }
    if (validator.isUndefined(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email field is required',
      });
    }
    if (!validator.isString(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email must be a string',
      });
    }
    if (!validator.itIsAnEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email address',
      });
    }
    if (password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'password is a required field',
      });
    }
    if (sex === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'sex is a required field',
      });
    }
    if (!['male', 'female'].includes(sex)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid sex, only accept [ male, female ]',
      });
    }
    if (!validator.isDateOfBirth(dateOfBirth)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid date of birth accepts yyyy-mm-dd format',
      });
    }
    if (!validator.isPassword(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit',
      });
    }
    if (!validator.isPhoneNumber(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid phone number',
      });
    }
    return next();
  }

  static signIn(req, res, next) {
    const { email, password } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'email is a required field',
      });
    }
    if (password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'password is a required field',
      });
    }
    if (!validator.isString(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Email must be a string',
      });
    }
    if (!validator.itIsAnEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email address',
      });
    }

    return next();
  }
}

export default UserValidator;
