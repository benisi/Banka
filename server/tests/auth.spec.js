import chai from 'chai';
<<<<<<< HEAD:server/tests/auth.spec.js
import auth from '../helpers/auth';
=======
import auth from '../../helpers/auth';
>>>>>>> chore/165379296/refactor-ui:server/tests/v1/auth.spec.js

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
