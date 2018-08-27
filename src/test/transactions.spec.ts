import 'mocha';
const chai = require('chai');
const expect = require('chai').expect;

import { properties } from './configs/properties';

chai.use(require('chai-http'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('API /transactions endpoint', function() {
  this.timeout(properties.timeoutValue);

  it('valid authorization header value - should return all transactions id successfully', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .get(properties.endpoints.getAllTransactions)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${properties.authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it('invalid authorization header value - should return unauthorized request in order of being a protected route', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .get(properties.endpoints.getAllTransactions)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
  });
});

describe('API /transaction/{transactionId} endpoint', function() {
  this.timeout(properties.timeoutValue);

  it('valid authorization header value - should return all specific transaction data successfully', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .get(properties.endpoints.getTransactionData)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${properties.authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it('invalid authorization header value - should return unauthorized request in order of being a protected route', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .get(properties.endpoints.getTransactionData)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
  });

  it('invalid transaction id path parameter value - should return not found request', () => {
    chai
      .request(properties.endpoints.baseUrl)
      .get(properties.endpoints.getTransactionDataWithInvalidPathParam)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${properties.authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
});
