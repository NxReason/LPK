const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const request = require('request-promise-native');
const { port } = require('../../app/config');

const baseUri = `http://localhost:${port}`;

describe('Routes', function() {

  describe('GET /', function() {

    const options = {
      uri: `${baseUri}/`,
      method: `GET`,
      resolveWithFullResponse: true
    };
    let req;
    before(function() {
      req = request(options);
    });

    it('should return html content', function() {
      return expect(req).to.eventually.have.deep.property('headers.content-type', 'text/html; charset=utf-8');
    });

    it('should have status 200', function() {
      return expect(req).to.eventually.have.property('statusCode', 200);
    });

  });
});
