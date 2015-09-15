'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/users_dev');
var port = process.env.PORT || 3000;

var router = require(__dirname + '/routes/users_routes');
app.use('/api', router);

app.listen(port, function() {
  console.log('Server running on port: ' + port);
});
