process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const login = require('./routes.login.test');

const notice1 = {
  subject: '通知',
  content: '测试通知 1'
};

describe('POST /v1/notice', () => {
  let token;
  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  it('should return 200 & should delete okay by notice_id', (done) => {
    chai.request(server)
      .post('/v1/notice')
      .set('x-access-token', token)
      .send(notice1)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        let notice_id = res.body.notice_id;
        res.body.content.should.eql(notice1.content);
        res.body.subject.should.eql(notice1.subject);
        res.body.user.id.should.eql('Z003');
        let temp = res.body;
        
        chai.request(server)
          .delete('/v1/notice/' + notice_id)
          .set('x-access-token', token)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.body.should.eql(temp);
            done();
          });
      });
  });
  it('should return 404 if no such notice id', (done) => {
    chai.request(server)
      .delete('/v1/notice/' + -1)
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(404);
        res.text.should.eql('No such notice id.');
        done();
      });
  });
});