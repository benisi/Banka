"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _users = require("./test-data/users");

var _account = require("./test-data/account");

var _transaction = require("./test-data/transaction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should,
    expect = _chai["default"].expect;
should();
var createUrl = '/api/v1/accounts';
var globalToken;
var accNumber;
describe('Test to log user in', function () {
  it('should return status 200, i.e user login was successful', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_users.validLoginData).end(function (err, res) {
      expect(res).to.have.status(200);
      var token = res.body.data.token;
      globalToken = token;
      done();
    });
  });
});
describe('Test to create a user bank account', function () {
  it('should return a status code of 201, i.e account was created successfully', function (done) {
    _chai["default"].request(_server["default"]).post(createUrl).set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res).to.have.status(201);
      var accountNumber = res.body.data.accountNumber;
      accNumber = accountNumber;
      done();
    });
  });
  it('should have a property called data', function (done) {
    _chai["default"].request(_server["default"]).post(createUrl).set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res.body).to.have.a.property('data');
      done();
    });
  });
});
describe('Test to credit account', function () {
  it('should return a status 200', function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/transactions/".concat(accNumber, "/credit")).set('Authorization', globalToken).send(_transaction.creditAccountData).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});