var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/cars_test';
var server = require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

describe('lib/http_basic test', function() {
  it('should be able to parse login info from a req header', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('testUser:testPass')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(req.hasOwnProperty('auth')).to.eql(true);
      expect(req.auth.username).to.eql('testUser');
    });
  });
});

describe('auth test', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('user model methods test', function() {
    var user = new User();
    user.username = 'userTest';
    user.basic.username = 'userTest';
    var plainPassword = 'userTestPass';

    before('create user and hash', function(done) {
      user.generateHash(plainPassword, function(hash) {
        user.save(function(err, data) {
          if (err) throw err;
          done();
        });
      });
    });

    it('should compare hash to userpassword', function(done) {
      user.compareHash(plainPassword, function(err, res) {
        expect(res).to.eql(true);
        done();
      });
    });

    it('should generate a unique user token', function(done) {
      user.generateToken(function(err, token) {
        if (err) throw err;
        var req = {};
        req.headers = { token: token };
        eatAuth(req, {}, function() {
          expect(req.user.username).to.eql(user.username);
          done();
        });
      });
    });
  });

  describe('test signup and login', function() {
    var userToken;
    it('should create a new user', function(done) {
      chai.request('localhost:3000/api')
        .post('/signup')
        .send({username: 'chuckNorris', password: 'texasranger'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          userToken = res.body.token;
          done();
        });
    });

    it('should sign in an existing user', function(done) {
      chai.request('localhost:3000/api')
      .get('/signin')
      .auth('chuckNorris', 'texasranger')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.eql(userToken);
        done();
      });
    });
  });
});
