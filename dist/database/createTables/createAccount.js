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

var createAccountTable = "CREATE TABLE IF NOT EXISTS accounts(\n        id BIGSERIAL PRIMARY KEY NOT NULL,\n        type CHARACTER VARYING(7) NOT NULL,\n        status CHARACTER VARYING(6) NOT NULL,\n        balance FLOAT(2) NOT NULL,\n        category CHARACTER VARYING(13) NOT NULL,\n        createdOn TIMESTAMP NOT NULL,\n        owner INTEGER NOT NULL,\n        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE\n    )";

var AccountsTableHandler =
/*#__PURE__*/
function () {
  function AccountsTableHandler() {
    _classCallCheck(this, AccountsTableHandler);
  }

  _createClass(AccountsTableHandler, null, [{
    key: "createTable",
    value: function createTable() {
      var create = _DBconnection["default"].query(createAccountTable).then(function (result) {
        return console.log("AccountsTable: ".concat(result.command, "ED"));
      })["catch"](function (error) {
        return console.log("accounts table ".concat(error));
      });

      return create;
    }
  }]);

  return AccountsTableHandler;
}();

var _default = AccountsTableHandler;
exports["default"] = _default;