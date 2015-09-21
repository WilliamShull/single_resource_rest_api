var mongoose = require('mongoose');
var eat = require('eat');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
  username: String,
  basic: {
    username: String,
    password: String
  }
});

schema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

schema.methods.compareHash = function(password, callback) {
  bcrypt.compare(password, this.basic.password, callback);
};

schema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', schema);
