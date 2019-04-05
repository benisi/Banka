import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { validLoginData, invalidLoginData } from '../test-data/users';

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
  it('should give a status code 400', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidLoginData)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Wrong email and password combination');
        done();
      });
  });
});
