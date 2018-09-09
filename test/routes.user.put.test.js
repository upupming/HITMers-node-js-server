process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const login = require('./routes.login.test');
const knex = require('../src/db/connection');

const server = require('../src/app');

let usersToBePut = [
  {
    id: 'W005',
    school: '美术学院',
    password: 'so-easy-to-crack'
  },
  {
    id: 'Z006',
    reputation: '90',
    password: 'easy-to-crack-too'
  },
];

let putSelfUser = {
  id: 'L004',
  school: '美术学院2',
  password: 'so-easy-to-crack2'
};

/**
 * Put users as superuser.
 */
describe('PUT users as superuser', () => {
  let token;

  before(async() => {
    let user = {
      id: 'Z003',
      password: '13849045786'
    };
    token = await login.getToken(user);
  });
  after(async() => {
    await knex.seed.run();
  });

  it('should return 200 and update users if the token is right', (done) => {
    chai.request(server)
      .put('/v1/user')
      .set('x-access-token', token)
      .send(usersToBePut)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        let updatedUsers = res.body;
        updatedUsers.should.be.a('array');
        // Check if updated
        chai.request(server)
        .get('/v1/user/W005')
        .set('x-access-token', token)
        .end(async(err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.should.be.a('object');
          res.body.password_changed_times.should.eql(1);
          res.body.should.eql(updatedUsers[0]);
          let token = await login.getToken(usersToBePut[0]);
          should.exist(token);
          done();
        });
      });
  });

  it('should return 200 if the user modify others', (done) => {
    chai.request(server)
    .put('/v1/user/L004')
    .set('x-access-token', token)
    .send(putSelfUser)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(200);
      res.body.school.should.eql('美术学院2');
      done();
    });
  });
});

  
/**
 * Put users as ordinary user.
 */
describe('PUT users as ordinary user', () => {
  let token;

  before(async() => {
    let user = {
      id: 'L004',
      password: '13848888786'
    };
    token = await login.getToken(user);
  });
  after(async() => {
    await knex.seed.run();
  });

  it('should return 403 if the user don\'t have priviledge to modify other users', (done) => {
    chai.request(server)
      .put('/v1/user')
      .set('x-access-token', token)
      .send(usersToBePut)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(403);
        res.text.should.eql('This user is not permitted to modify other users.');
        done();
      });
  });

  it('should return 403 if the user modify other user', (done) => {
    chai.request(server)
    .put('/v1/user/W005')
    .set('x-access-token', token)
    .send(putSelfUser)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(403);
      res.text.should.eql('This user is not permitted to modify other users.');
      done();
    });
  });

  it('should return 200 if the user modify himself', (done) => {
    chai.request(server)
    .put('/v1/user/L004')
    .set('x-access-token', token)
    .send(putSelfUser)
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(200);
      let updatedUser = res.body;
      updatedUser.should.be.a('object');
      updatedUser.password_changed_times.should.eql(1);
      // Check id updated
      chai.request(server)
        .get('/v1/user/L004')
        .set('x-access-token', token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.should.eql(updatedUser);
          done();
        });
    });
  });

  it('should return 409 if modify id to others', (done) => {
    chai.request(server)
    .put('/v1/user/L004')
    .set('x-access-token', token)
    .send(usersToBePut[0])
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(409);
      res.text.should.eql('This id already exists.');
      done();
    });
  });
});