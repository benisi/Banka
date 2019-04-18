import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { validLoginData } from './test-data/users';
import { validAccountData } from './test-data/account';
import {
  debitAccountData, creditAccountData, undefinedDebitAccountData, invalidDebitAccountData,
} from './test-data/transaction';


chai.use(chaiHttp);

const { should, expect } = chai;
should();

const createUrl = '/api/v1/accounts';

let globalToken;
let accNumber;

describe('Test to log user in', () => {
  it('should return status 200, i.e user login was successful', (done) => {
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
      .post(createUrl)
      .set('Authorization', globalToken)
      .send(validAccountData, 'watin be this')
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { accountNumber } = res.body.data;
        accNumber = accountNumber;
        done();
      });
  });
  it('should have a property called data', (done) => {
    chai.request(app)
      .post(createUrl)
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.have.a.property('data');
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


describe('Test to debit account', () => {
  it('should return a status 200', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${accNumber}/debit`)
      .set('Authorization', globalToken)
      .send(debitAccountData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Test when amount is not a number', () => {
  it('should return a status 400', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${accNumber}/debit`)
      .set('Authorization', globalToken)
      .send(invalidDebitAccountData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test when amount is undefined', () => {
  it('should return a status 400', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${accNumber}/debit`)
      .set('Authorization', globalToken)
      .send(undefinedDebitAccountData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
