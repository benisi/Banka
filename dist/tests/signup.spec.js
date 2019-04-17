"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _users = require("./test-data/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-undef
_chai["default"].use(_chaiHttp["default"]);

var url = '/api/v1/auth/signup';
var should = _chai["default"].should,
    expect = _chai["default"].expect;
should();
describe('A test for default response', function () {
  it('should return a success message', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should have a data type of object at req.body', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      res.body.should.be.a('object');
      done();
    });
  });
  it('should return a message of welcome to Banka', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      expect(res.body.message).to.equal('Hello there, Welcome to Banka');
      done();
    });
  });
});
describe('Tests to create a user', function () {
  it('should return 201 success status code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.validUser).end(function (err, res) {
      expect(res).to.have.status(201);
      res.body.should.be.a('object');
      expect(res.body.data).to.have.property('token');
      done();
    });
  });
});
describe('Tests for undefined email', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.undefineEmail).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Email field is required');
      done();
    });
  });
});
describe('Tests if email exist', function () {
  it('should return 409 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.alreadyInUseUser).end(function (err, res) {
      expect(res).to.have.status(409);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Email already exist');
      done();
    });
  });
});
describe('Tests for invalid email address', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidEmail).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid email address');
      done();
    });
  });
});
describe('Tests for dataType of email --string', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.nonStringEmail).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Email must be a string');
      done();
    });
  });
});
describe('Tests for undefined first name', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.undefineFirstName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('First name field is required');
      done();
    });
  });
});
describe('Tests for dataType of first name --string', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.nonStringFirstName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('First name must be a string');
      done();
    });
  });
});
describe('Tests for invalid first name', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidFirstName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid first name');
      done();
    });
  });
});
describe('Tests for undefined Last name', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.undefineLastName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Last name field is required');
      done();
    });
  });
});
describe('Tests for dataType of Last name --string', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.nonStringLastName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Last name must be a string');
      done();
    });
  });
});
describe('Tests for invalid Last name', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidLastName).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid last name');
      done();
    });
  });
});
describe('Tests for invalid password', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidPassword).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit');
      done();
    });
  });
});
describe('Tests for invalid phone number', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidPhoneNumber).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid phone number');
      done();
    });
  });
});
describe('Tests for invalid sex', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidSex).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Invalid sex, only accept [ male, female ]');
      done();
    });
  });
});
describe('Tests for invalid date of birth', function () {
  it('should return 400 error code', function (done) {
    _chai["default"].request(_server["default"]).post(url).send(_users.invalidDateOfBirth).end(function (err, res) {
      expect(res).to.have.status(400);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');
      done();
    });
  });
});