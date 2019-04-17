"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidAccountStatus = exports.undefinedAccountStatus = exports.undefinedAccountCategory = exports.undefinedAccountType = exports.activateAccountData = exports.invalidAccountCategory = exports.invalidAccountType = exports.validAccountData = void 0;
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
var undefinedAccountType = {
  type: undefined,
  category: 'cooperate'
};
exports.undefinedAccountType = undefinedAccountType;
var undefinedAccountCategory = {
  type: 'savings',
  category: undefined
};
exports.undefinedAccountCategory = undefinedAccountCategory;
var activateAccountData = {
  status: 'deactivate'
};
exports.activateAccountData = activateAccountData;
var undefinedAccountStatus = {
  status: undefined
};
exports.undefinedAccountStatus = undefinedAccountStatus;
var invalidAccountStatus = {
  status: 'error'
};
exports.invalidAccountStatus = invalidAccountStatus;