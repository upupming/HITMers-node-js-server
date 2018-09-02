process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const login = require('./routes.login.test');

const LiSiShift = {
  id: 'L004',
  year: 2018,
  month: 9,
  day: 8,
  morning: true
};
const ZhangSanShift = {
  id: 'Z003',
  year: 2018,
  month: 9,
  day: 8,
  morning: false
};

describe('POST /v1/shift', () => {
  let token;
  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  it('should return 403 if post other user', (done) => {
    chai.request(server)
      .post('/v1/shift')
      .set('x-access-token', token)
      .send(LiSiShift)  
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('User is not allowed to add shifts for other users.');
        done();
      });
  });
  it('should return 200 if post oneself', (done) => {
    chai.request(server)
      .post('/v1/shift')
      .set('x-access-token', token)
      .send(ZhangSanShift)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        delete res.body.date_time;
        res.body.should.eql({
          id: 'Z003',
          name: '张三',
          year: 2018,
          month: 9,
          day: 8,
          morning: false,
          afternoon: true
        });
        done();
      });
  });
});