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
    .send({
      firstName: 'test',
      lastName: 'user',
      age: 30
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.firstName).to.eql('test');
      expect(res.body.lastName).to.eql('user');
      done();
    });
  });

  describe('modifying user resources', function() {
    beforeEach('create new user to modify', function(done) {
      var testUser = new User({
        firstName: 'test',
        lastName: 'user',
        age: 20
      });
      testUser.save(function(err, data) {
        if (err) throw err;
        this.testUser = data;
        done();
      }.bind(this));
    });

    it('Should update an existing user', function(done) {
      chai.request(host)
      .put('/users/' + this.testUser._id)
      .send({age: 25})
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

