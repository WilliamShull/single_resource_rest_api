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

  it('should create a new user', function(done) {
    done();
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
});

describe('test login for existing user', function() {
  before(function(done) {
    var newUser = new User();
    newUser.username = 'chuckNorris';
    newUser.basic.username = 'chuckNorris';
  });
});






