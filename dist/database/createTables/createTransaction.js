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

var createTransactionTable = "CREATE TABLE IF NOT EXISTS transactions (\n        id BIGSERIAL PRIMARY KEY NOT NULL,\n        type CHARACTER VARYING(7) NOT NULL,\n        createdOn TIMESTAMP NOT NULL,\n        cashier INTEGER NOT NULL,\n        accountNumber INTEGER NOT NULL,\n        oldBalance FLOAT(2) NOT NULL,\n        newBalance FLOAT(2) NOT NULL,\n        FOREIGN KEY (cashier) REFERENCES users (id) ON DELETE CASCADE\n    )";

var TransactionsTableHandler =
/*#__PURE__*/
function () {
  function TransactionsTableHandler() {
    _classCallCheck(this, TransactionsTableHandler);
  }

  _createClass(TransactionsTableHandler, null, [{
    key: "createTable",
    value: function createTable() {
      var create = _DBconnection["default"].query(createTransactionTable).then(function (result) {
        return console.log("transactions Table: ".concat(result.command, "ED"));
      })["catch"](function (error) {
        return console.log("transactions table ".concat(error));
      });

      return create;
    }
  }]);

  return TransactionsTableHandler;
}();

var _default = TransactionsTableHandler;
exports["default"] = _default;