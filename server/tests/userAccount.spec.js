import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { validLoginData, clientLoginData } from './test-data/users';
import {
  validAccountData,
} from './test-data/account';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

const url = '/api/v1/accounts';
let globalToken;
let userEmail;
let invaderToken;
const invalidLoginData = {
  email: 'admin@gmail.com',
  password: 'dkkdkdddk',
};

describe('User should be able to login to test get account end point', () => {
  it('should give a status code of 200 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token, email } = res.body.data[0];
        globalToken = token;
        userEmail = email;
        done();
      });
  });
});

describe('User should not be able to login to test get account end point because credentials are not correct', () => {
  it('should give a status code of 401 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidLoginData)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('User should not be able to login to test get account end point because credentials are invalid', () => {
  it('should give a status code of 401 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 23333, password: 'ffff' })
      .end((err, res) => {
        expect(res).to.have.status(401);
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
});

describe('Test for invader log in', () => {
  it('should return status 200, i.e user invader login was successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(clientLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token } = res.body.data[0];
        invaderToken = token;
        done();
      });
  });
});


describe('User should be able to create a user bank account to test get account endpoint', () => {
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
});

describe('User should be able get all his account', () => {
  it('should give a status code of 200', (done) => {
    chai.request(app)
      .get(`/api/v1/${userEmail}/accounts`)
      .set('Authorization', globalToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('User should not be able get all his account because input will cause error', () => {
  it('should give a status code of 404', (done) => {
    chai.request(app)
      .get(`/api/v1/${true}/accounts`)
      .set('Authorization', globalToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
describe('User should not be able get all his account because token is valid bit account is not his', () => {
  it('should give a status code of 403', (done) => {
    chai.request(app)
      .get(`/api/v1/${userEmail}/accounts`)
      .set('Authorization', invaderToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
