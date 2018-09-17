import 'mocha';
const chai = require('chai');
const expect = require('chai').expect;

import { properties } from './configs/properties';

chai.use(require('chai-http'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('API /authentication endpoint', function() {
  this.timeout(properties.timeoutValue);

  it('valid credentials - should authenticate user and return a new token', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .post(properties.endpoints.authentication)
      .set('Content-Type', 'application/json')
      .send({
        user: {
          email: properties.credentials.username,
          password: properties.credentials.password
        }
      })
      .then(res => {
        expect(res).to.have.status(200);
      });
  });

  it('invalid credentials - should not authenticate the user and retrieves 403 error', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .post(properties.endpoints.authentication)
      .set('Content-Type', 'application/json')
      .send({
        user: {
          email: properties.credentials.wrongUsername,
          password: properties.credentials.password
        }
      })
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property(
          'description',
          'Invalid username or password.'
        );
      });
  });
});
