'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/users_dev');
var router = require(__dirname + '/routes/car_routes');
var port = process.env.PORT || 3000;

app.use('/api', router);

app.listen(port, function() {
  console.log('Server running on port: ' + port);
});
