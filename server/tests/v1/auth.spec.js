import chai from 'chai';
import auth from '../../helper/auth';

const { should } = chai;
should();

const payload = {
  id: 1
};

describe('Test to check for the functioning of the auth helper', () => {
  it('should return a token', (done) => {
    auth.createToken(payload).should.be.a('string');
    done();
  });
});
