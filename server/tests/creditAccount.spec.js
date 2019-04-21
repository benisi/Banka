import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { validLoginData, clientLoginData } from './test-data/users';
import { validAccountData } from './test-data/account';
import { creditAccountData } from './test-data/transaction';


chai.use(chaiHttp);

const { should, expect } = chai;
should();

const createUrl = '/api/v1/accounts';

let globalToken;
let invaderToken;
let accNumber;

describe('Test to log user in', () => {
  it('should return status 200, i.e user login was successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token } = res.body.data[0];
        globalToken = token;
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

describe('Test to create a user bank account', () => {
  it('should return a status code of 201, i.e account was created successfully', (done) => {
    chai.request(app)
      .post(createUrl)
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.a.property('data');
        const { accountNumber } = res.body.data[0];
        accNumber = accountNumber;
        done();
      });
  });
});

describe('Test to credit account', () => {
  it('should return a status 200', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${accNumber}/credit`)
      .set('Authorization', globalToken)
      .send(creditAccountData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Test to return user transaction history', () => {
  it('should return 200 for successful transaction retrieval', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${accNumber}/transactions`)
      .set('authorization', globalToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Test for blocking accesss to invader request for transaction history', () => {
  it('should return 403 for invader transaction history retrieval', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${accNumber}/transactions`)
      .set('authorization', invaderToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
describe('Test for returning 404 for invalid account', () => {
  it('should return 404 for invalid account number transaction history retrieval', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/656565656/transactions')
      .set('authorization', invaderToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
