import chai from 'chai';
import account from '../../database/account';

const { should } = chai;
should();


describe('Test for generating account', () => {
  it('should return a number', (done) => {
    console.log(account.generateAccountNumber());
    account.generateAccountNumber().should.be.a('number');
    done();
  });
});
