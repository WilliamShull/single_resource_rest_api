'use strict';

var express = require('express');
var bodyParser = require('bodyParser').json;
var handleError = require(__dirname + '/../lib/errHandler');
var User = require(__dirname + '/../models/user');

userRouter = exports = module.exports = express.Router();

userRouter.get('/users', function(req, res) {
  User.find({}, function(err, data) {
    if (err) throw handleError(err, res);
    res.json(data);
  });
});

userRouter.put('/users', bodyParser, function(req, res) {
  newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) throw handleError;
    res.json(data);
  });
});

userRouter.post('/users/:id', bodyParser, function(req, res) {
  var userUpdate = req.body;
  User.update({_id: req.params.id}, userUpdate, function(err) {
    if (err) throw handleError;
    res.json({msg: 'Great success!'});
  });
});

userRouter.delete('/users/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw bodyParser;
    res.json({msg: 'User zapped!'});
  });
});

