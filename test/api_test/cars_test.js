'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/cars_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var host = 'localhost:3000/api';
var Car = require(__dirname + '/../models/car');

describe('car resource routing', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('post to /cars should create new car', function(done) {
    chai.request(host)
      .post('/cars')
      .send({ make: 'Volkswagon',
        model: 'Jetta',
        year: 2013,
        color: 'red',
        sold: true,
        bodyStyle: 'sedan'
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.make).to.eql('Volkswagon');
        done();
      });
  });

  it('get to /cars should return all cars', function(done) {
    chai.request(host)
      .get('/cars')
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });

  describe('alter car resources', function() {
    beforeEach('Create new resource to test against', function(done) {
      var testCar = new Car({ make: 'Ford',
        model: 'Mustang',
        year: 1970,
        color: 'Dark green',
        sold: false,
        bodyStyle: 'hatchback'
      });
      testCar.save(function(err, data) {
        if (err) throw err;
        this.testCar = data;
        done();
      }.bind(this));
    });

    it('put to /cars/id should update the resource', function(done) {
      chai.request(host)
        .put('/cars/' + this.testCar._id)
        .send({sold: true})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('updated');
          done();
        });
    });

    it('should try to buy a car', function(done) {
      chai.request(host)
        .get('/cars/' + this.testCar._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('purchased!');
          done();
        });
    });

    it('delete to /cars/id should remove that resource', function(done) {
      chai.request(host)
        .delete('/cars/' + this.testCar._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('removed');
          done();
        });
    });
  });

});

