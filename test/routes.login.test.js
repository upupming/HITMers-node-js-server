process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');

const ZhangSan = {
  'id': 'Z003',
  'name': '张三',
  'identify': '老师',
  'phone_number': 13849045786,
  'language': '中英',
  'session': 14,
  'email': 'zhangsan@qq.com',
  'school': '经管学院',
  'password_changed_times': 0,
  'reputation': 0
};

describe('POST /v1/login', () => {
  it('should return 404 if no user found', (done) => {
    chai.request(server)
      .post('/v1/login')
      .send({id: 'no_such_id'})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.auth.should.eql(false);
        should.not.exist(res.body.token);
        done();
      });
  });

  it('should return 401 if password is not valid', (done) => {
    chai.request(server)
      .post('/v1/login')
      .send({id: 'Z003', password: 'worng-password'})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.auth.should.eql(false);
        should.not.exist(res.body.token);
        done();
      });
  });

  it('should return a non-null token of the password is valid', (done) => {
    chai.request(server)
      .post('/v1/login')
      .send({id: 'Z003', password: '13849045786'})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.auth.should.eql(true);
        should.exist(res.body.token);
        delete res.body.user.user_id;
        res.body.user.should.eql(ZhangSan);
        done();
      });
  });
});

/**
 * Get a token.
 */
exports.getToken = function(user) {
  return chai.request(server)
    .post('/v1/login')
    .send(user)
    .then(res => {
      return res.body.token;
    });
};