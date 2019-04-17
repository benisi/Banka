"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DBconnection = _interopRequireDefault(require("../DBconnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createUsersTable = "CREATE TABLE IF NOT EXISTS users (\n        id BIGSERIAL PRIMARY KEY NOT NULL,\n        firstName CHARACTER VARYING(50) NOT NULL,\n        type CHARACTER VARYING(7) NOT NULL,\n        stateOfOrigin CHARACTER VARYING(50) NOT NULL,\n        phoneNumber CHARACTER VARYING(50) NOT NULL,\n        title CHARACTER VARYING(50) NOT NULL,\n        sex CHARACTER VARYING(6) NOT NULL,\n        dateOfBirth DATE NOT NULL,\n        isAdmin BOOLEAN NOT NULL,\n        lastName CHARACTER VARYING(50) NOT NULL,\n        email CHARACTER VARYING(100) UNIQUE NOT NULL,\n        password CHARACTER VARYING(255) NOT NULL\n    )"; // Class To Create User Table

var UsersTableHandler =
/*#__PURE__*/
function () {
  function UsersTableHandler() {
    _classCallCheck(this, UsersTableHandler);
  }

  _createClass(UsersTableHandler, null, [{
    key: "createTable",
    value: function createTable() {
      var create = _DBconnection["default"].query(createUsersTable).then(function (result) {
        return console.log("usersTable: ".concat(result.command, "ED"));
      })["catch"](function (error) {
        return console.log("users table ".concat(error));
      });

      return create;
    }
  }]);

  return UsersTableHandler;
}();

var _default = UsersTableHandler;
exports["default"] = _default;