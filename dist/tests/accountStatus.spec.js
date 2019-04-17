"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _account = require("./test-data/account");

var _users = require("./test-data/users");

var _account2 = _interopRequireDefault(require("../database/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should,
    expect = _chai["default"].expect;
should();
var accNumb;
var globalToken;
var clientToken;
describe('User should be able to login', function () {
  it('should give a status code of 200 and set user token variable', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_users.adminLoginData).end(function (err, res) {
      expect(res).to.have.status(200);
      var token = res.body.data.token;
      globalToken = token;
      done();
    });
  });
});
describe('Test to create a user bank account', function () {
  it('should return a status code of 201, i.e account was created successfully', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/accounts').set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res).to.have.status(201);
      accNumb = res.body.data.accountNumber;
      done();
    });
  });
  it('should have a property called data', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/accounts').set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res.body).to.have.a.property('data');
      done();
    });
  });
});
describe('Test to activate user account', function () {
  it('should return a status of 200', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/account/".concat(accNumb)).set('Authorization', globalToken).send(_account.activateAccountData).end(function (err, res) {
      console.log(res.body);
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Client should be able to login', function () {
  it('should give a status code of 200 and set user token variable', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_users.clientLoginData).end(function (err, res) {
      expect(res).to.have.status(200);
      var token = res.body.data.token;
      clientToken = token;
      done();
    });
  });
});
describe('Test for permission for user in staff admin route', function () {
  it('should return a status of 403 permission denied', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/account/".concat(accNumb)).set('Authorization', clientToken).send(_account.activateAccountData).end(function (err, res) {
      expect(res).to.have.status(403);
      done();
    });
  });
});
describe('Test for undefined status', function () {
  it('should return a status of 400', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/account/".concat(accNumb)).set('Authorization', globalToken).send(_account.undefinedAccountStatus).end(function (err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
});
describe('Test for invalid account status', function () {
  it('should return a status of 400', function (done) {
    _chai["default"].request(_server["default"]).patch("/api/v1/account/".concat(accNumb)).set('Authorization', globalToken).send(_account.invalidAccountStatus).end(function (err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
});
describe('Test to show if we can activate account', function () {
  it('should return true', function (done) {
    var activateData = {
      status: 'active'
    };
    expect(_account2["default"].activate(activateData)).to.be.equal(true);
    done();
  });
});
describe('Test to show if we can deactivate account', function () {
  it('should return true', function (done) {
    var activateData = {
      status: 'dormant'
    };
    expect(_account2["default"].activate(activateData)).to.be.equal(true);
    done();
  });
});