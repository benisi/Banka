"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../database/user"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _validator = _interopRequireDefault(require("../helpers/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "create",
    value: function create(req, res) {
      var email = req.body.email;

      var users = _user["default"].findAll();

      if (users.find(function (entry) {
        return entry.email === email;
      })) {
        return res.status(409).json({
          status: 409,
          error: 'Email already exist'
        });
      }

      var userObj = req.body;
      userObj.password = _bcrypt["default"].hashSync(req.body.password, 10);
      userObj.isAdmin = false;
      userObj.type = 'client';

      var refData = _user["default"].create(userObj);

      if (refData) {
        var password = refData.password,
            data = _objectWithoutProperties(refData, ["password"]);

        data.token = _auth["default"].createToken({
          id: data.id,
          type: data.type,
          isAdmin: data.isAdmin
        });
        return res.status(201).json({
          status: 201,
          data: data
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'User validation error'
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var users = _user["default"].findAll();

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;
      var foundUser = users.find(function (entry) {
        return entry.email === email.trim();
      });

      if (!foundUser || !_validator["default"].checkPassword(password, foundUser.password)) {
        return res.status(401).json({
          status: 401,
          error: 'Wrong email and password combination'
        });
      }

      var pass = foundUser.password,
          data = _objectWithoutProperties(foundUser, ["password"]);

      data.token = _auth["default"].createToken({
        id: data.id,
        type: data.type,
        isAdmin: data.isAdmin
      });
      return res.status(200).json({
        status: 200,
        data: data
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;