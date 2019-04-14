"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _auth = _interopRequireDefault(require("../../helper/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var should = _chai["default"].should;
should();
var payload = {
  id: 1
};
describe('Test to check for the functioning of the auth helper', function () {
  it('should return a token', function (done) {
    _auth["default"].createToken(payload).should.be.a('string');

    done();
  });
});