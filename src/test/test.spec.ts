import 'mocha';
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('API endpoint /register', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {});

  after(function() {});

  // POST - regoster
  it('should return registered user', function() {
    return chai
      .request('https://localhost:8081')
      .post('/register')
      .send({ user: { email: 'test', password: 'test' } })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});
