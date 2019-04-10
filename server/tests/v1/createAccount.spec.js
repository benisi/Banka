import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { validLoginData } from '../test-data/users';
import { validAccountData, invalidAccountType, invalidAccountCategory } from '../test-data/account';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

const url = '/api/v1/accounts';
let globalToken;


describe('User should be able to login', () => {
  it('should give a status code of 200 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token } = res.body.data;
        globalToken = token;
        done();
      });
  });
});

describe('Test to create a user bank account', () => {
  it('should return a status code of 201, i.e account was created successfully', (done) => {
    chai.request(app)
      .post(url)
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should have a property called data', (done) => {
    chai.request(app)
      .post(url)
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.have.a.property('data');
        done();
      });
  });
});

describe('Test for invalid account type', () => {
  it('should return status code 400 for wrong account type', (done) => {
    chai.request(app)
      .post(url)
      .set('Authorization', globalToken)
      .send(invalidAccountType)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return an arror message', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidAccountType)
      .set('Authorization', globalToken)
      .end((err, res) => {
        expect(res.body.error).to.equal('Invalid type, only accept [ current, savings ]');
      });
    done();
  });
});

describe('Test for invalid account category', () => {
  it('should return status code 400 for wrong account category', (done) => {
    chai.request(app)
      .post(url)
      .set('Authorization', globalToken)
      .send(invalidAccountCategory)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return an arror message', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidAccountCategory)
      .set('Authorization', globalToken)
      .end((err, res) => {
        expect(res.body.error).to.equal('Invalid category, only accept [ individual, organization ]');
      });
    done();
  });
});
