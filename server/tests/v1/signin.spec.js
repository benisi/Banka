import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { validLoginData, invalidLoginData } from '../test-data/users';
import validator from '../../helper/validator';
import user from '../../database/data-storage';

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
        res.body.should.be.a('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('should give a status code 403', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidLoginData)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Wrong email and password combination');
        done();
      });
  });
});
describe('Test for bcrypt password match', () => {
  it('should return true when password are compared', (done) => {
    const users = user.findAll();
    const foundUser = users.find(entry => entry.email === validLoginData.email);
    validator.checkPassword(validLoginData.password, foundUser.password).should.be.equal(true);
    done();
  });
});
