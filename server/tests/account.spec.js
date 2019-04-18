import chai from 'chai';
import account from '../database/account';

const { should } = chai;
should();


describe('Test for generating account', () => {
  it('should return a number', (done) => {
    account.generateAccountNumber().should.be.a('number');
    done();
  });
});
