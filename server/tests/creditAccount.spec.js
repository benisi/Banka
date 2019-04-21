import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { validLoginData } from './test-data/users';
import { validAccountData } from './test-data/account';
import { creditAccountData } from './test-data/transaction';


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
        const { token } = res.body.data[0];
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
