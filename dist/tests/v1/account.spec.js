"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _account = _interopRequireDefault(require("../../database/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var should = _chai["default"].should;
should();
describe('Test for generating account', function () {
  it('should return a number', function (done) {
    console.log(_account["default"].generateAccountNumber());

    _account["default"].generateAccountNumber().should.be.a('number');

    done();
  });
});