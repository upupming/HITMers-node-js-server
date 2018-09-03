process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get checks using filter.
 */
describe('GET /v1/check/:id', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 403 if get others\'s checks', (done) => {
    chai.request(server)
    .get('/v1/check/L004')
    .set('x-access-token', token)
    .query({
      year: 2018
    })
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(403);
      res.text.should.eql('User is not allowed to get checks of other users.');
      done();
    });
  }); 
  it('should return all checks if no filter applied', (done) => {
    chai.request(server)
      .get('/v1/check/Z003')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(4);
        res.body.should.eql([{'check_id':1,'id':'Z003','name':'张三','date_time':'2018-09-02T16:00:00.000Z','check_in':0,'check_out':1,'morning':1,'afternoon':0},{'check_id':2,'id':'Z003','name':'张三','date_time':'2018-07-02T16:00:00.000Z','check_in':0,'check_out':1,'morning':0,'afternoon':1},{'check_id':3,'id':'Z003','name':'张三','date_time':'2018-08-02T16:00:00.000Z','check_in':0,'check_out':1,'morning':0,'afternoon':1},{'check_id':4,'id':'Z003','name':'张三','date_time':'2018-07-05T16:00:00.000Z','check_in':0,'check_out':1,'morning':0,'afternoon':1}]);
        done();
      });
  });
  it('should return all checks using filter', (done) => {
    chai.request(server)
      .get('/v1/check/Z003')
      .set('x-access-token', token)
      .query({year: 2018, month: 8})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(1);
        res.body.should.eql([{'check_id':3,'id':'Z003','name':'张三','date_time':'2018-08-02T16:00:00.000Z','check_in':0,'check_out':1,'morning':0,'afternoon':1}]);
        done();
      });
  });
});