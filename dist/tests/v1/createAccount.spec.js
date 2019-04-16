"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _users = require("../test-data/users");

var _account = require("../test-data/account");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect,
    should = _chai["default"].should;
should();
var url = '/api/v1/accounts';
var globalToken;
describe('User should be able to login', function () {
  it('should give a status code of 200 and set user token variable', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(_users.validLoginData).end(function (err, res) {
      expect(res).to.have.status(200);
      var token = res.body.data.token;
      globalToken = token;
      done();
    });
  });
});
describe('Test to create a user bank account', function () {
  it('should return a status code of 201, i.e account was created successfully', function (done) {
    _chai["default"].request(_app["default"]).post(url).set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res).to.have.status(201);
      done();
    });
  });
  it('should have a property called data', function (done) {
    _chai["default"].request(_app["default"]).post(url).set('Authorization', globalToken).send(_account.validAccountData).end(function (err, res) {
      expect(res.body).to.have.a.property('data');
      done();
    });
  });
});
describe('Test for invalid account type', function () {
  it('should return status code 400 for wrong account type', function (done) {
    _chai["default"].request(_app["default"]).post(url).set('Authorization', globalToken).send(_account.invalidAccountType).end(function (err, res) {
      expect(res).to.have.status(400);
    });

    done();
  });
  it('should return an arror message', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_account.invalidAccountType).set('Authorization', globalToken).end(function (err, res) {
      expect(res.body.error).to.equal('Invalid type, only accept [ current, savings ]');
    });

    done();
  });
});
describe('Test for invalid account category', function () {
  it('should return status code 400 for wrong account category', function (done) {
    _chai["default"].request(_app["default"]).post(url).set('Authorization', globalToken).send(_account.invalidAccountCategory).end(function (err, res) {
      expect(res).to.have.status(400);
    });

    done();
  });
  it('should return an arror message', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_account.invalidAccountCategory).set('Authorization', globalToken).end(function (err, res) {
      expect(res.body.error).to.equal('Invalid category, only accept [ individual, organization ]');
    });

    done();
  });
});