process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const login = require('./routes.login.test');

const video1 = {
  video_code: 'c9zrn',
  subject: '视频标题',
  desc: '视频 by upupming'
};

describe('POST /v1/video', () => {
  let token;
  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  it('should return 200 & should delete okay by video_id', (done) => {
    chai.request(server)
      .post('/v1/video')
      .set('x-access-token', token)
      .send(video1)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        let video_id = res.body.video_id;
        res.body.desc.should.eql(video1.desc);
        res.body.subject.should.eql(video1.subject);
        res.body.user.id.should.eql('Z003');
        let temp = res.body;
        
        chai.request(server)
          .delete('/v1/video/' + video_id)
          .set('x-access-token', token)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.body.should.eql(temp);
            done();
          });
      });
  });
  it('should return 404 if no such video id', (done) => {
    chai.request(server)
      .delete('/v1/video/' + -1)
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(404);
        res.text.should.eql('No such video id.');
        done();
      });
  });
});