process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const login = require('./routes.login.test');

const newVisitor = {
  identity: 'some important person',
  arriving: '2018-11-30',
  number_of_people: 34,
  appointer: 'Trump',
  appointer_phone_number: '110',
  guided_by: 'MrWang'
};

describe('POST /v1/visitor', () => {
  let token;
  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  it('should return 200 if post & should delete okay by visitor_id', (done) => {
    chai.request(server)
      .post('/v1/visitor')
      .set('x-access-token', token)
      .send(newVisitor)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        let visitor_id = res.body.visitor_id;
        res.body.should.eql({
          visitor_id,
          identity: 'some important person',
          arriving: '2018-11-30',
          number_of_people: 34,
          appointer: 'Trump',
          appointer_phone_number: '110',
          guided_by: 'MrWang'
        });
        let temp = res.body;
        temp.arriving = '2018-11-29T16:00:00.000Z';
        
        chai.request(server)
          .delete('/v1/visitor/' + visitor_id)
          .set('x-access-token', token)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.body.should.eql(temp);
            done();
          });
      });
  });
  it('should return 404 if no such visitor id', (done) => {
    chai.request(server)
      .delete('/v1/visitor/' + -1)
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(404);
        res.text.should.eql('No such visitor id.');
        done();
      });
  });
});