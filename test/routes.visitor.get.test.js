process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get visitors during period.
 */
describe('GET /v1/visitor', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  
  it('should return all visitors during period', (done) => {
    chai.request(server)
      .get('/v1/visitor')
      .set('x-access-token', token)
      .query({
        startDateTime: '2018-11-03',
        endDateTime: '2018-11-04 24:00:00'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(3);
        res.body[0][0][0].identity.should.eql('10.3m哈尔滨某中学学生');
        res.body[0][0][1].identity.should.eql('10.3m计算机学院大一新生');
        res.body[1][0][0].identity.should.eql('10.4m材料党支部');
        done();
      });
  });
});