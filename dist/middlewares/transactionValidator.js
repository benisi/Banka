"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("../helpers/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionValidator = function transactionValidator(req, res, next) {
  var amount = req.body.amount;

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

  return next();
};

var _default = transactionValidator;
exports["default"] = _default;