var mongoose = require('mongoose');
var carTypes = 'hatchback sedan suv minivan luxury sport van off-road truck'.split(' ');

function validateYear(year) {
  return year < 2016;
}

var schema = new mongoose.Schema({
  make: { type: String, required: true, validate: /[a-z]/ },
  model: { type: String, required: true },
  year: { type: Number, validate: [validateYear, 'Invalid year.']},
  color: String,
  sold: Boolean,
  bodyStyle: { type: String, enum: carTypes }
});

schema.methods.purchaseCar = function(callback) {
  var result;
  if (this.sold) {
    result = 'already owned!';
  } else {
    result = 'purchased!';
    this.sold = true;
  }
  callback(result);
};


module.exports = mongoose.model('Car', schema);