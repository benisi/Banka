"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _users = require("../test-data/users");

var _validator = _interopRequireDefault(require("../../helper/validator"));

var _user = _interopRequireDefault(require("../../database/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var url = '/api/v1/auth/signin';
var should = _chai["default"].should,
    expect = _chai["default"].expect;
should();
describe('Tests for valid input for user login', function () {
  it('should give a status code of 200', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_users.validLoginData).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should have a property called data', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_users.validLoginData).end(function (err, res) {
      expect(res.body).to.have.property('data');
      done();
    });
  });
  it('should have a property called token at req.body.data', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_users.validLoginData).end(function (err, res) {
      expect(res.body.data).to.have.property('token');
      done();
    });
  });
  it('should have a data type of object at req.body.data', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_users.validLoginData).end(function (err, res) {
      res.body.should.be.a('object');
      done();
    });
  });
  it('should give a status code 403', function (done) {
    _chai["default"].request(_app["default"]).post(url).send(_users.invalidLoginData).end(function (err, res) {
      res.body.should.have.status(403);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.be.equal('Wrong email and password combination');
      done();
    });
  });
});
describe('Test for bcrypt password match', function () {
  it('should return true when password are compared', function (done) {
    var users = _user["default"].findAll();

    var foundUser = users.find(function (entry) {
      return entry.email === _users.validLoginData.email;
    });

    _validator["default"].checkPassword(_users.validLoginData.password, foundUser.password).should.be.equal(true);

    done();
  });
});