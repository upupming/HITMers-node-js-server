process.env.PORT = 8898;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('../src/config');

const server = require('../src/app');

describe('GET /videos as superuser', () => {


  it('should return 200 if get video', (done) => {
    let auth = 'Basic ' + new Buffer(config.streamUsername + ':' + config.streamPassword).toString('base64');

    chai.request(server)
      .get('/videos/a0c8p')
      .set('Authorization', auth)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'files'
        );
        done();
      });
  });

});