process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get notices during period.
 */
describe('GET /v1/notice', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  
  it('should return all notices from newer to older', (done) => {
    chai.request(server)
      .get('/v1/notice')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(2);
        res.body[0].notice_id.should.eql(2);
        res.body[0].notice_id.should.eql(1);
        done();
      });
  });
});