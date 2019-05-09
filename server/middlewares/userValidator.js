
import validator from '../helpers/validator';
import Response from '../helpers/Response';
import utility from '../helpers/utility';

class UserValidator {
  static signUp(req, res, next) {
    const {
      firstName, lastName, email, password, stateOfResidence,
      phoneNumber, dateOfBirth, sex,
    } = req.body;
    if (validator.isUndefined(utility.trimString(firstName))) {
      return Response.error(res, 400, 'First name field is required');
    }
    if (!validator.isString(utility.trimString(firstName))) {
      return Response.error(res, 400, 'First name must be a string');
    }
    if (!validator.isAName(utility.trimString(firstName))) {
      return Response.error(res, 400, 'Invalid first name, it must only contain alphabet, (,.\'-) special characters and no white space');
    }
    if (validator.isUndefined(utility.trimString(lastName))) {
      return Response.error(res, 400, 'Last name field is required');
    }
    if (!validator.isString(utility.trimString(lastName))) {
      return Response.error(res, 400, 'Last name must be a string');
    }
    if (!validator.isAName(utility.trimString(lastName))) {
      return Response.error(res, 400, 'Invalid last name');
    }
    if (validator.isUndefined(stateOfResidence)) {
      return Response.error(res, 400, 'State of residence field is required');
    }
    if (typeof stateOfResidence !== 'string') {
      return Response.error(res, 400, 'State of residence must be a string');
    }
    if (validator.isUndefined(phoneNumber)) {
      return Response.error(res, 400, 'Phone number field is required');
    }
    if (!validator.isString(utility.trimString(phoneNumber))) {
      return Response.error(res, 400, 'Phone number must be a string');
    }
    if (validator.isUndefined(dateOfBirth)) {
      return Response.error(res, 400, 'Date of birth field is required');
    }
    if (!validator.isString(dateOfBirth)) {
      return Response.error(res, 400, 'Date of birth must be a string');
    }
    if (validator.isUndefined(email)) {
      return Response.error(res, 400, 'Email field is required');
    }
    if (!validator.isString(email)) {
      return Response.error(res, 400, 'Email must be a string');
    }
    if (!validator.isAnEmail(utility.trimString(email))) {
      return Response.error(res, 400, 'Invalid email address');
    }
    if (password === undefined) {
      return Response.error(res, 400, 'password is a required field');
    }
    if (sex === undefined) {
      return Response.error(res, 400, 'sex is a required field');
    }
    if (!['male', 'female'].includes(utility.trimString(sex))) {
      return Response.error(res, 400, 'Invalid sex, only accept [ male, female ]');
    }
    if (!validator.isDateOfBirth(utility.trimString(dateOfBirth))) {
      return Response.error(res, 400, 'Invalid date of birth accepts yyyy-mm-dd format');
    }
    if (!validator.isAllowedDateOfBirth(utility.trimString(dateOfBirth))) {
      return Response.error(res, 400, 'You must be 18 or above to have an account');
    }
    if (!validator.isPassword(password)) {
      return Response.error(res, 400, 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit');
    }
    if (!validator.isPhoneNumber(utility.trimString(phoneNumber))) {
      return Response.error(res, 400, 'Invalid phone number');
    }
    return next();
  }

  static signIn(req, res, next) {
    const { email, password } = req.body;
    if (email === undefined) {
      return Response.error(res, 400, 'email is a required field');
    }
    if (password === undefined) {
      return Response.error(res, 400, 'password is a required field');
    }
    if (!validator.isString(email)) {
      return Response.error(res, 400, 'Email must be a string');
    }
    if (!validator.isAnEmail(utility.trimString(email))) {
      return Response.error(res, 400, 'Invalid email address');
    }

    return next();
  }
}

export default UserValidator;
