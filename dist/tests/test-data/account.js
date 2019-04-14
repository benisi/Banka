"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateAccountData = exports.invalidAccountCategory = exports.invalidAccountType = exports.validAccountData = void 0;
var validAccountData = {
  type: 'savings',
  category: 'individual'
};
exports.validAccountData = validAccountData;
var invalidAccountType = {
  type: 'error',
  category: 'individual'
};
exports.invalidAccountType = invalidAccountType;
var invalidAccountCategory = {
  type: 'savings',
  category: 'cooperate'
};
exports.invalidAccountCategory = invalidAccountCategory;
var activateAccountData = {
  status: 'deactivate'
};
exports.activateAccountData = activateAccountData;