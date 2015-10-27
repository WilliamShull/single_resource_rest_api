'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/users_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'secretKeyDontRead';
var userRouter = require(__dirname + '/routes/user_routes');
var carRouter = require(__dirname + '/routes/car_routes');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));
app.use('/api', userRouter);
app.use('/api', carRouter);

app.listen(port, function() {
  console.log('Server running on port: ' + port);
});
