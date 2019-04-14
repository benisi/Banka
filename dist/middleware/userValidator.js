"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../database/user"));

var _validator = _interopRequireDefault(require("../helper/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserValidator =
/*#__PURE__*/
function () {
  function UserValidator() {
    _classCallCheck(this, UserValidator);
  }

  _createClass(UserValidator, null, [{
    key: "signUp",
    value: function signUp(req, res, next) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          stateOfResidence = _req$body.stateOfResidence,
          phoneNumber = _req$body.phoneNumber,
          dateOfBirth = _req$body.dateOfBirth,
          title = _req$body.title,
          sex = _req$body.sex;

      if (_validator["default"].isUndefined(firstName)) {
        return res.status(400).json({
          status: 400,
          error: 'First name field is required'
        });
      }

      if (!_validator["default"].isString(firstName)) {
        return res.status(400).json({
          status: 400,
          error: 'First name must be a string'
        });
      }

      if (_validator["default"].isEmpty(firstName)) {
        return res.status(400).json({
          status: 400,
          error: 'First name should not be empty'
        });
      }

      if (!_validator["default"].itIsAName(firstName)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid first name'
        });
      } // last name validating


      if (_validator["default"].isUndefined(lastName)) {
        return res.status(400).json({
          status: 400,
          error: 'Last name field is required'
        });
      }

      if (!_validator["default"].isString(lastName)) {
        return res.status(400).json({
          status: 400,
          error: 'Last name must be a string'
        });
      }

      if (_validator["default"].isEmpty(lastName)) {
        return res.status(400).json({
          status: 400,
          error: 'Last name should not be empty'
        });
      }

      if (!_validator["default"].itIsAName(lastName)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid last name'
        });
      } // state of residence


      if (_validator["default"].isUndefined(stateOfResidence)) {
        return res.status(400).json({
          status: 400,
          error: 'State of residence field is required'
        });
      }

      if (!_validator["default"].isString(stateOfResidence)) {
        return res.status(400).json({
          status: 400,
          error: 'State of residence must be a string'
        });
      }

      if (_validator["default"].isEmpty(stateOfResidence)) {
        return res.status(400).json({
          status: 400,
          error: 'State of residence should not be empty'
        });
      }

      if (!_validator["default"].itIsAName(stateOfResidence)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid state of residence'
        });
      } // title


      if (_validator["default"].isUndefined(title)) {
        return res.status(400).json({
          status: 400,
          error: 'Title field is required'
        });
      }

      if (!_validator["default"].isString(title)) {
        return res.status(400).json({
          status: 400,
          error: 'Title must be a string'
        });
      }

      if (_validator["default"].isEmpty(title)) {
        return res.status(400).json({
          status: 400,
          error: 'Title should not be empty'
        });
      } // phone number


      if (_validator["default"].isUndefined(phoneNumber)) {
        return res.status(400).json({
          status: 400,
          error: 'Phone number field is required'
        });
      }

      if (!_validator["default"].isString(phoneNumber)) {
        return res.status(400).json({
          status: 400,
          error: 'Phone number must be a string'
        });
      }

      if (_validator["default"].isEmpty(phoneNumber)) {
        return res.status(400).json({
          status: 400,
          error: 'Phone number should not be empty'
        });
      } // date of Birth


      if (_validator["default"].isUndefined(dateOfBirth)) {
        return res.status(400).json({
          status: 400,
          error: 'Date of birth field is required'
        });
      }

      if (!_validator["default"].isString(dateOfBirth)) {
        return res.status(400).json({
          status: 400,
          error: 'Date of birth must be a string'
        });
      }

      if (_validator["default"].isEmpty(dateOfBirth)) {
        return res.status(400).json({
          status: 400,
          error: 'Date of birth should not be empty'
        });
      }

      if (_validator["default"].isEmpty(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email should not be empty'
        });
      }

      if (_validator["default"].isUndefined(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email field is required'
        });
      }

      var users = _user["default"].findAll();

      if (users.find(function (entry) {
        return entry.email === email;
      })) {
        return res.status(400).json({
          status: 400,
          error: 'Email already exist'
        });
      }

      if (!_validator["default"].isString(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email must be a string'
        });
      }

      if (!_validator["default"].itIsAnEmail(email)) {
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

      if (!_validator["default"].isDateOfBirth(dateOfBirth)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid date of birth accepts mm/dd/yyyy or dd/mm/yyyyformat'
        });
      }

      if (!_validator["default"].isPassword(password)) {
        return res.status(400).json({
          status: 400,
          error: 'Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit'
        });
      }

      if (!_validator["default"].isPhoneNumber(phoneNumber)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid phone number'
        });
      }

      return next();
    }
  }, {
    key: "signIn",
    value: function signIn(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

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

      var users = _user["default"].findAll();

      var foundUser = users.find(function (entry) {
        return entry.email === req.body.email.trim();
      });

      if (!foundUser || !_validator["default"].checkPassword(req.body.password, foundUser.password)) {
        return res.status(403).json({
          status: 403,
          error: 'Wrong email and password combination'
        });
      }

      req.body.foundUser = foundUser;
      return next();
    }
  }]);

  return UserValidator;
}();

var _default = UserValidator;
exports["default"] = _default;