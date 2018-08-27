import 'mocha';
const chai = require('chai');
const expect = require('chai').expect;

import { properties } from './configs/properties';

chai.use(require('chai-http'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('API /register endpoint', function() {
  this.timeout(properties.timeoutValue);

  it('valid credentials - should register user successfully', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .post(properties.endpoints.registration)
      .send({
        user: {
          email: properties.credentials.username,
          password: properties.credentials.password
        }
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  it('invalid credentials (no username) - should not register user, return bad request and there is no username provided message error', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .post(properties.endpoints.registration)
      .send({ user: {} })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property(
          'description',
          'No username was specified.'
        );
      });
  });

  it('invalid credentials (no password) - should not register user, return bad request and there is no password provided message error', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .post(properties.endpoints.registration)
      .send({ user: { email: properties.credentials.username } })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property(
          'description',
          'No password was specified.'
        );
      });
  });
});
