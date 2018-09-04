process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('../src/config');

const server = require('../src/app');

const ShiLaoShi = {
  'id': 'MsShi',
  'name': '史老师',
  'identify': '老师',
  'phone_number': 120,
  'language': '中英',
  'session': 14,
  'email': 'shilaoshi@qq.com',
  'school': '经管学院',
  'password': '1456'
};

describe('POST /v1/register', () => {
  it('should return 403 if wrong rigister code', (done) => {
    chai.request(server)
      .post('/v1/register')
      .send({user: ShiLaoShi})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('Please provide correct register code.');
        done();
      });
  });

  it('should return 200 if rigister code is correct', (done) => {
    chai.request(server)
      .post('/v1/register')
      .send({user: ShiLaoShi, registerCode: config.registerCode})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.text.should.eql('The user has been added successfully.');
        done();
      });
  });
});