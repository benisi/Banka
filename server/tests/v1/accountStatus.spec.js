import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { activateAccountData } from '../test-data/account';
import { validLoginData } from '../test-data/users';

chai.use(chaiHttp);

const { should, expect } = chai;
should();

const url = '/api/v1/account/8900002';

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
