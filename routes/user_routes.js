var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/errHandler');
var httpBasic = require(__dirname + '/../lib/http_basic');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var userRouter = module.exports = exports = express.Router();

userRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    ee.emit('generateHashEvent', newUser, req, res);
  });

  ee.on('generateHashEvent', function(newUser, req, res) {
    newUser.save(function(err, data) {
      if (err) return handleError(err, res);
      ee.emit('saveUserEvent', newUser, req, res);
    });
  });

    ee.on('saveUserEvent', function(newUser, req, res) {
      newUser.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
});

userRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);

    if(!user) {
      console.log('could not authenticate');
      return res.status(401).json({msg: 'could not authenticate user login'});
    }

    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) return handleError(err, res);
      if (!hashRes) {
        console.log('could not authenticate user: ' + req.auth.username);
        return res.status(401).json({msg: 'authenticat says no!'});
      }

      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
  });
});
