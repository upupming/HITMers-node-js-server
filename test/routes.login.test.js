process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');

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
        done();
      });
  });
});