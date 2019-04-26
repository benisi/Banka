import chai from 'chai';
import Model from '../database/sqlModel';

const { expect, should } = chai;
should();

describe('Test for utitility in sql mode', () => {
  it('should generate proper sql statement', (done) => {
    const query = Model.generateConstraint(['email', 'firstName']);
    expect(/AND/i.test(query)).to.be.equal(true);
    done();
  });
});

describe('Test for utitility in sql mode', () => {
  it('should generate proper sql statement set value', (done) => {
    const query = Model.generateSetValues(['email', 'firstName']);
    expect(/,/i.test(query)).to.be.equal(true);
    done();
  });
});
