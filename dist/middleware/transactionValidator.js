"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../database/account"));

var _validator = _interopRequireDefault(require("../helper/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionValidator = function transactionValidator(req, res, next) {
  var accountNumber = req.params.accountNumber;
  var amount = req.body.amount;

  var accountRef = _account["default"].getAccount(parseInt(accountNumber, 10));

  if (!accountRef) {
    return res.status(400).json({
      status: 400,
      error: "Account ".concat(accountNumber, " does not exist")
    });
  }

  if (_validator["default"].isUndefined(amount)) {
    return res.status(400).json({
      status: 400,
      error: 'Amount is required'
    });
  }

  if (typeof amount !== 'number') {
    return res.status(400).json({
      status: 400,
      error: 'Amount must be a number'
    });
  }

  req.body.accountData = accountRef;
  return next();
};

var _default = transactionValidator;
exports["default"] = _default;