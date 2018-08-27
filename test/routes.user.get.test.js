process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');

const server = require('../src/app');

/**
 * Get all users as superuser.
 */
describe('GET /v1/user/all as superuser', () => {
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
      .get('/v1/user/all')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.text.should.eql('No token provided.');
        done();
      });
  });
  it('should return 401 if the token is wrong', (done) => {
    chai.request(server)
      .get('/v1/user/all')
      .set('x-access-token', 'wrong-token')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.text.should.eql('Wrong token.');
        done();
      });
  });
  it('should return 200 if the token is right', (done) => {
    chai.request(server)
      .get('/v1/user/all')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.be.a('array');
        res.body.length.should.eql(4);
        res.body[0].should.include.keys(
          'id',
          'name',
          'identify',
          'phone_number',
          'language',
          'session',
          'password_changed_times',
          'reputation'
        );
        done();
      });
  });
});

/**
 * Get all users as ordinary user.
 */
describe('GET /v1/user/all as ordinary user', () => {
  let token;
  before(async() => {
    let user = {
      id: 'L004',
      password: '13848888786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 403 if the user don\'t have priviledge to access all users', (done) => {
    chai.request(server)
    .get('/v1/user/all')
    .set('x-access-token', token)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(403);
      res.text.should.eql('User is not permitted to access all users.');
      done();
    });
  });
});

/**
 * Get User by id as superuser.
 */
describe('GET /v1/user/:id as superuser', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 200 if get one\'s own user info', (done) => {
    chai.request(server)
      .get('/v1/user/Z003')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'id',
          'name',
          'identify',
          'phone_number',
          'language',
          'session',
          'password_changed_times',
          'reputation'
        );
        done();
      });
  });

  it('should return 200 if get others\' user info', (done) => {
    chai.request(server)
      .get('/v1/user/L004')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'id',
          'name',
          'identify',
          'phone_number',
          'language',
          'session',
          'password_changed_times',
          'reputation'
        );
        done();
      });
  });
});
/**
 * Get user by is as ordinary user.
 */

describe('GET /v1/user/:id as superuser', () => {
  let token;

  before(async() => {
    let user = {
      id: 'L004',
      password: '13848888786'
    };
    token = await login.getToken(user);
  });
  
  it('should return 403 if get others\' user info', (done) => {
    chai.request(server)
      .get('/v1/user/Z003')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('This user is not permitted to access other users.');
        done();
      });
  });

  it('should return 200 if get one\'s own user info', (done) => {
    chai.request(server)
      .get('/v1/user/L004')
      .set('x-access-token', token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'id',
          'name',
          'identify',
          'phone_number',
          'language',
          'session',
          'password_changed_times',
          'reputation'
        );
        done();
      });
  });
});