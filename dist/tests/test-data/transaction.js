"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidDebitAccountData = exports.undefinedDebitAccountData = exports.debitAccountData = exports.creditAccountData = void 0;
var creditAccountData = {
  amount: 5000.23
};
exports.creditAccountData = creditAccountData;
var debitAccountData = {
  amount: 1000.23
};
exports.debitAccountData = debitAccountData;
var undefinedDebitAccountData = {
  amount: undefined
};
exports.undefinedDebitAccountData = undefinedDebitAccountData;
var invalidDebitAccountData = {
  amount: 'jfhf'
};
exports.invalidDebitAccountData = invalidDebitAccountData;