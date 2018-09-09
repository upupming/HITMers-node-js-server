process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get videos during period.
 */
describe('GET /v1/video', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  
  it('should return all videos from newer to older', (done) => {
    chai.request(server)
      .get('/v1/video')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(1);
        res.body[0].created_by.should.eql('Z003');
        done();
      });
  });
});