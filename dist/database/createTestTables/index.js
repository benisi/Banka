"use strict";

var _createUser = _interopRequireDefault(require("./createUser"));

var _createAccount = _interopRequireDefault(require("./createAccount"));

var _createTransaction = _interopRequireDefault(require("./createTransaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_createUser["default"].createTable().then(function () {
  return _createAccount["default"].createTable();
}).then(function () {
  return _createTransaction["default"].createTable();
})["catch"](function (error) {
  console.log(error);
});