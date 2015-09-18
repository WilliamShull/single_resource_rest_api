var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstName: { type: String, validate: /[a-z]/ },
  lastName: { type: String, validate: /[a-z]/ },
  age: { type: Number, min: 18 }
});

module.exports = mongoose.model('User', schema);
