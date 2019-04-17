"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _model = _interopRequireDefault(require("../database/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect,
    should = _chai["default"].should;
should();
var structure = {
  name: String,
  age: Number
};
var data = {
  name: 'Ben',
  age: 22
};
var myModel = new _model["default"](structure);
describe('Test for model reliability', function () {
  it('should return an object when creating one', function (done) {
    myModel.create(data).should.be.a('object');
    done();
  });
  it('should return an have a property id', function (done) {
    expect(myModel.create(data)).to.have.a.property('id');
    done();
  });
});
describe('Test to find all data', function () {
  it('should return an array when finding all data', function (done) {
    myModel.findAll(1).should.be.a('array');
    done();
  });
});
describe('Test to find one data entry', function () {
  it('should return an object with property id', function (done) {
    myModel.find(1).should.be.a('object');
    expect(myModel.find(1)).to.have.a.property('id');
    done();
  });
});