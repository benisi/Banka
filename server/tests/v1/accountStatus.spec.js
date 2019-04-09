import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { activateAccountData, validAccountData } from '../test-data/account';
import { clientLoginData, adminLoginData } from '../test-data/users';
import account from '../../database/account';

chai.use(chaiHttp);

const { should, expect } = chai;
should();

const url = '/api/v1/account/8900002';

let globalToken;
let clientToken;


describe('User should be able to login', () => {
  it('should give a status code of 200 and set user token variable', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(adminLoginData)
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
      .post('/api/v1/accounts')
      .set('authorization', globalToken)
      .send(validAccountData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should have a property called data', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('authorization', globalToken)
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
      .patch(url)
      .set('authorization', globalToken)
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
        const { token } = res.body.data;
        clientToken = token;
        done();
      });
  });
});

describe('Test for permission for user in staff admin route', () => {
  it('should return a status of 401 permission denied', (done) => {
    chai.request(app)
      .patch(url)
      .set('authorization', clientToken)
      .send(activateAccountData)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Test to show if we can activate account', () => {
  it('should return true', (done) => {
    const activateData = { status: 'active' };
    expect(account.activate(activateData)).to.be.equal(true);
    done();
  });
});

describe('Test to show if we can deactivate account', () => {
  it('should return true', (done) => {
    const activateData = { status: 'dormant' };
    expect(account.activate(activateData)).to.be.equal(true);
    done();
  });
});
