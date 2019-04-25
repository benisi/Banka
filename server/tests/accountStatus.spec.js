import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import {
  activateAccountData, validAccountData, undefinedAccountStatus, invalidAccountStatus,
} from './test-data/account';
import { clientLoginData, adminLoginData } from './test-data/users';

chai.use(chaiHttp);

const { should, expect } = chai;
should();

let accNumb;

let globalToken;
let clientToken;


describe('User should be able to login', () => {
  it('should give a status code of 200 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(adminLoginData)
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
      .post('/api/v1/accounts')
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        accNumb = res.body.data[0].accountNumber;
        done();
      });
  });
  it('should have a property called data', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.have.a.property('data');
        done();
      });
  });
});


describe('Test to activate user account', () => {
  it('should return a status of 200', (done) => {
    chai.request(app)
      .patch(`/api/v1/account/${accNumb}`)
      .set('Authorization', globalToken)
      .send(activateAccountData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Client should be able to login', () => {
  it('should give a status code of 200 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(clientLoginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token } = res.body.data[0];
        clientToken = token;
        done();
      });
  });
});

describe('Test for permission for user in staff admin route', () => {
  it('should return a status of 403 permission denied', (done) => {
    chai.request(app)
      .patch(`/api/v1/account/${accNumb}`)
      .set('Authorization', clientToken)
      .send(activateAccountData)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('Test for undefined status', () => {
  it('should return a status of 400', (done) => {
    chai.request(app)
      .patch(`/api/v1/account/${accNumb}`)
      .set('Authorization', globalToken)
      .send(undefinedAccountStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test for invalid account status', () => {
  it('should return a status of 400', (done) => {
    chai.request(app)
      .patch(`/api/v1/account/${accNumb}`)
      .set('Authorization', globalToken)
      .send(invalidAccountStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test to activate user account by a client', () => {
  it('should return a status of 403', (done) => {
    chai.request(app)
      .patch(`/api/v1/account/${accNumb}`)
      .set('Authorization', clientToken)
      .send(activateAccountData)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
