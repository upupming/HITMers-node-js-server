process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

let usersToBePost = [
  {
    id: 'moon5',
    name: 'Moon Star',
    identify: '讲解员',
    phone_number: 17766458988,
    language: '中文',
    session: 14,
    email: 'cs65@may.xyz',
    school: '人文学院'
  },
  {
    id: 'newton2',
    name: 'Newton',
    identify: '馆藏人员',
    phone_number: 18866458988,
    language: '中英',
    session: 16,
    email: 'cs6521@may.xyz',
    school: '外国语学院'
  }
];
let usersToBeDeleted = [
  {id: 'moon5'},
  {id: 'newton2'}
];

/**
 * Post & delete users as superuser.
 */
describe('POST /v1/user as superuser', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });

  it('should return 401 if no token provided', (done) => {
    chai.request(server)
      .post('/v1/user')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.text.should.eql('No token provided.');
      }).then(() => {
        chai.request(server)
        .del('/v1/user')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(401);
          res.text.should.eql('No token provided.');
          done();
        });
      });
  });
  it('should return 401 if the token is wrong', (done) => {
    chai.request(server)
      .post('/v1/user')
      .set('x-access-token', 'wrong-token')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.text.should.eql('Wrong token.');
      }).then(() => {
        chai.request(server)
        .del('/v1/user')
        .set('x-access-token', 'wrong-token')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(401);
          res.text.should.eql('Wrong token.');
          done();
        });
      });
  });

  it('should return 200 if the token is right', (done) => {
    chai.request(server)
      .post('/v1/user')
      .set('x-access-token', token)
      .send(usersToBePost)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.text.should.eql('Users have been added successfully.');
      }).then(() => {
        chai.request(server)
        .del('/v1/user')
        .set('x-access-token', token)
        .send(usersToBeDeleted)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.text.should.eql('Users have been deleted successfully.');
          done();
        });
      });
  });
});

/**
 * Post & delete users as ordinary user.
 */
describe('POST /v1/user as ordinary user', () => {
  let token;
  before(async() => {
    let user = {
      id: 'L004',
      password: '13848888786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 403', (done) => {
    chai.request(server)
    .post('/v1/user')
    .set('x-access-token', token)
    .send(usersToBePost)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(403);
      res.text.should.eql('This user is not permitted to add new users.');
    }).then(() => {
      chai.request(server)
      .del('/v1/user')
      .set('x-access-token', token)
      .send(usersToBeDeleted)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('This user is not permitted to delete users.');
        done();
      });
    });
  });
});
