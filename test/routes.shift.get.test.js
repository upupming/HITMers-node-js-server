process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get shifts during period.
 */
describe('GET /v1/shift', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  
  it('should return all shifts during period', (done) => {
    chai.request(server)
      .get('/v1/shift')
      .set('x-access-token', token)
      .query({
        year: 2018,
        startMonth: 9,
        startDay: 2,
        endMonth: 9,
        endDay: 4
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(3);
        res.body[0][1][0].id.should.eql('Z006');
        res.body[2][1][0].id.should.eql('Z006');
        done();
      });
  });
});

/**
 * Get shifts by id.
 */
describe('GET /v1/shift/:id', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 403 if get others\'s shifts', (done) => {
    chai.request(server)
    .get('/v1/shift/L004')
    .set('x-access-token', token)
    .query({
      year: 2018,
      startMonth: 8,
      startDay: 2,
      endMonth: 9,
      endDay: 10
    })
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(403);
      res.text.should.eql('This user is not allowed to get other users\' shifts.');
      done();
    });
  });
  
  it('should return all shifts during period', (done) => {
    chai.request(server)
      .get('/v1/shift/Z003')
      .set('x-access-token', token)
      .query({
        year: 2018,
        startMonth: 9,
        startDay: 2,
        endMonth: 9,
        endDay: 10
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.body.should.be.a('array');
        res.body[0].id.should.eql('Z003');
        done();
      });
  });
});