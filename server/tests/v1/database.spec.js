import chai from 'chai';
import model from '../../database/model';

const { expect, should } = chai;
should();

const structure = {
  name: String,
  age: Number
};
const data = {
  name: 'Ben',
  age: 22
};
const myModel = new model(structure);

describe('Test for model reliability', () => {
  it('should return an object when creating one', (done) => {
    myModel.create(data).should.be.a('object');
    done();
  });
  it('should return an have a property id', (done) => {
    expect(myModel.create(data)).to.have.a.property('id');
    done();
  });
});

describe('Test to find all data', () => {
  it('should return an array when finding all data', (done) => {
    myModel.findAll(1).should.be.a('array');
    done();
  });
});

describe('Test to find one data entry', () => {
  it('should return an object with property id', (done) => {
    myModel.find(1).should.be.a('object');
    expect(myModel.find(1)).to.have.a.property('id');
    done();
  });
});
