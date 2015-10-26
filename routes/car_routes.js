'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/errHandler');
var Car = require(__dirname + '/../models/car');


var carRouter = module.exports = exports = express.Router();

carRouter.get('/cars', function(req, res) {
  Car.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

carRouter.post('/cars', jsonParser, function(req, res) {
  var carData = new Car(req.body);
  carData.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

carRouter.put('/cars/:id', jsonParser, function(req, res) {
  var updateData = req.body;
  delete updateData._id;
  Car.findByIdAndUpdate(req.params.id, updateData, function(err, data) {
    if (err) return handleError(err, res);
    res.json({ msg: 'updated' });
  });
});

carRouter.delete('/cars/:id', function(req, res) {
  Car.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({ msg: 'removed' });
  });
});

carRouter.get('/cars/:id', function(req, res) {
  Car.findOne({_id: req.params.id}, function(err, data) {
    data.purchaseCar(function(result) {
      res.json({ msg: result });
    });
  });
});
