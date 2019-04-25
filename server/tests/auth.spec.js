import chai from 'chai';
import chaiHttp from 'chai-http';
import auth from '../helpers/auth';
import validator from '../helpers/validator';
import { authTestSignup, authTestlogin } from './test-data/users';
import app from '../server';


chai.use(chaiHttp);
const { should, expect } = chai;
should();

const url = '/api/v1/auth/signup';

// eslint-disable-next-line no-unused-vars
let globalToken;
const payload = {
  id: 1,
};

describe('Test for unauthorize route staff only signup', () => {
  it('should return 201 for unauthorize user', (done) => {
    chai.request(app)
      .post(url)
      .send(authTestSignup)
      .end((err, res) => {
        expect(res).to.have.a.status(201);
        done();
      });
  });
});

describe('Test for auth user login', () => {
  it('should login auth user and get token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(authTestlogin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.data[0].should.have.property('token');
        globalToken = res.body.data[0].token;
        done();
      });
  });
});

describe('Test to access staffonly route', () => {
  it('should return a 403', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/:accountNumber/credit')
      .set('Authorization', globalToken)
      .send({ amount: 300 })
      .end((err, res) => {
        expect(res.body).to.have.status(403);
        done();
      });
  });
});

describe('Test for no token supplied', () => {
  it('should return a 400', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/:accountNumber/credit')
      .set('Authorization', ' ')
      .send({ amount: 300 })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        done();
      });
  });
});

describe('Test for invalid token', () => {
  it('should return a 401', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/:accountNumber/credit')
      .set('Authorization', 'jknjkndjknvkjndvkkjd')
      .send({ amount: 300 })
      .end((err, res) => {
        expect(res.body).to.have.status(401);
        done();
      });
  });
});


describe('Test to check for the functioning of the auth helper', () => {
  it('should return a token', (done) => {
    auth.createToken(payload).should.be.a('string');
    done();
  });
});

describe('Test to check for the functioning of the validator helper is boolean', () => {
  it('should be true', (done) => {
    expect(validator.itIsBoolean(true)).to.be.equal(true);
    done();
  });
  it('should be false', (done) => {
    expect(validator.itIsBoolean('jjj')).to.be.equal(false);
    done();
  });
});
