import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import {
  validLoginData, invalidLoginData, undefinedEmailLoginData, undefinedPasswordLoginData,
} from './test-data/users';

chai.use(chaiHttp);

const url = '/api/v1/auth/signin';

const { should, expect } = chai;
should();

describe('Tests for valid input for user login', () => {
  it('should give a status code of 200', (done) => {
    chai.request(app)
      .post(url)
      .send(validLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should have a property called data', (done) => {
    chai.request(app)
      .post(url)
      .send(validLoginData)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should have a property called token at req.body.data', (done) => {
    chai.request(app)
      .post(url)
      .send(validLoginData)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property('token');
        done();
      });
  });
  it('should have a data type of object at req.body.data', (done) => {
    chai.request(app)
      .post(url)
      .send(validLoginData)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  it('should give a status code 401', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidLoginData)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Wrong email and password combination');
        done();
      });
  });
});

describe('Tests for undefined email', () => {
  it('should give a status code of 400', (done) => {
    chai.request(app)
      .post(url)
      .send(undefinedEmailLoginData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
describe('Tests for undefined password', () => {
  it('should give a status code of 400', (done) => {
    chai.request(app)
      .post(url)
      .send(undefinedPasswordLoginData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
