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
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('Should create a new user', function(done) {
    chai.request(host)
    .post('/users')
    .send({firstName: 'test', lastName: 'user', email: 'sample@test.com'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.firstName).to.eql('test');
      expect(res.body.lastName).to.eql('user');
      expect(res.body.email).to.eql('sample@test.com');
      done();
    });
  });

  describe('modifying user resources', function() {
    beforeEach(function(done) {
      var testUser = new User({firstName: 'test', lastName: 'user', email: 'test@sample.com'});
      testUser.save(function(err, data) {
        this.testUser = data;
        done();
      }.bind(this));
    });

    it('Should update an existing user', function(done) {
      chai.request(host)
      .put('/users/' + this.testUser._id)
      .send({email: 'edited@email.com'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        done();
      });
    });

    it('Should remove an existing user', function(done) {
      chai.request(host)
      .delete('/users/' + this.testUser._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Removed');
        done();
      });
    });
  });
});
