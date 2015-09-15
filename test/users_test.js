'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/users_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var host = 'localhost:3000/api';
var User = require(__dirname + '/../models/user');

describe('new user resources', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('Should get all users', function(done) {
    chai.request(host)
    .get('/users')
    .end(function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });

  it('Should create a new user', function(done) {

  });
});

describe('modifying user resources', function() {
  beforeEach(function(done) {
    var testUser = new User({firstName: 'test', lastName: 'user', email: "test@sample.com"});
    testUser.save(function(err, data) {
      this.testUser = data;
      done();
    }).bind(this);
  });

  it('Should update an existing user', function(done) {

  });

  it('Should remove an existing user', function(done) {

  });
});
