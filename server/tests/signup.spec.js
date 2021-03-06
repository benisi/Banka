// eslint-disable-next-line no-undef
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import {
  validUser, undefineEmail, invalidEmail, nonStringEmail,
  nonStringFirstName, undefineFirstName, invalidFirstName, nonStringLastName,
  undefineLastName, invalidLastName, invalidPassword, invalidDateOfBirth,
  invalidPhoneNumber, invalidSex, validUser1,
} from './test-data/users';

const superAdminUser = { ...validUser1, isSuperAdmin: 'hello' };

chai.use(chaiHttp);

const url = '/api/v1/auth/signup';
const { should, expect } = chai;
should();

describe('A test for default response', () => {
  it('should return a success message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should have a data type of object at req.body', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return a message of welcome to Banka', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.equal('Hello there, Welcome to Banka');
        done();
      });
  });
});

describe('Tests to create a user', () => {
  it('should return 201 success status code', (done) => {
    chai.request(app)
      .post(url)
      .send(validUser1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        res.body.data.should.be.a('array');
        expect(res.body.data[0]).to.have.property('token');
        done();
      });
  });
});
describe('Tests to create a admin', () => {
  it('should return 400 and fail to create super admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/admin/signup')
      .send(validUser1)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
describe('Tests to create a admin', () => {
  it('should return 400 and fail to create super adsmin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/admin/signup')
      .send(superAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Tests for undefined email', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(undefineEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email field is required');
        done();
      });
  });
});
describe('Tests if email exist', () => {
  it('should return 409 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(validUser)
      .end((err, res) => {
        expect(res).to.have.status(409);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email already exist');
        done();
      });
  });
});
describe('Tests for invalid email address', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid email address');
        done();
      });
  });
});
describe('Tests for dataType of email --string', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(nonStringEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email must be a string');
        done();
      });
  });
});

describe('Tests for undefined first name', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(undefineFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('First name field is required');
        done();
      });
  });
});
describe('Tests for dataType of first name --string', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(nonStringFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('First name must be a string');
        done();
      });
  });
});
describe('Tests for invalid first name', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid first name, it must only contain alphabet, (,.\'-) special characters and no white space');
        done();
      });
  });
});

describe('Tests for undefined Last name', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(undefineLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Last name field is required');
        done();
      });
  });
});
describe('Tests for dataType of Last name --string', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(nonStringLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Last name must be a string');
        done();
      });
  });
});
describe('Tests for invalid Last name', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid last name');
        done();
      });
  });
});
describe('Tests for invalid password', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password must have a length of 8 to 20 aplhanumeric characters, can not start with a digit, underscore or special character and must contain at least one digit');
        done();
      });
  });
});
describe('Tests for invalid phone number', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidPhoneNumber)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid phone number');
        done();
      });
  });
});
describe('Tests for invalid sex', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidSex)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid sex, only accept [ male, female ]');
        done();
      });
  });
});
describe('Tests for invalid date of birth', () => {
  it('should return 400 error code', (done) => {
    chai.request(app)
      .post(url)
      .send(invalidDateOfBirth)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
