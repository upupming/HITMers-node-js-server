process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const login = require('./routes.login.test');

const LiSiCheckIn = {
  id: 'L004',
  in: true,
  morning: true
};
const ZhangSanCheckIn = {
  id: 'Z003',
  in: true,
  morning: true
};

describe('POST /v1/check', () => {
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
      .post('/v1/check')
      .set('x-access-token', token)
      .send(LiSiCheckIn)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('User is not allowed to add checks for other users.');
        done();
      });
  });
  it('should return 200 if post oneself', (done) => {
    chai.request(server)
      .post('/v1/check')
      .set('x-access-token', token)
      .send(ZhangSanCheckIn)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        delete res.body.date_time;
        res.body.should.eql({
          afternoon: false,
          check_in: true,
          check_out: false,
          id: 'Z003',
          morning: true,
          name: '张三',
        });
        done();
      });
  });
});