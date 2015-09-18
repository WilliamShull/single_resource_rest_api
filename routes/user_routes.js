'use strict';

var express = require('express');
var bodyParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/errHandler');
var User = require(__dirname + '/../models/user');

var userRouter = module.exports = exports = express.Router();

userRouter.get('/users', function(req, res) {
  User.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

userRouter.post('/users', bodyParser, function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

userRouter.put('/users/:id', bodyParser, function(req, res) {
  var updateUser = req.body;
  delete updateUser._id;
  User.findByIdAndUpdate(req.params.id, updateUser, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'Updated'});
  });
});

userRouter.delete('/users/:id', function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'Removed'});
  });
});

