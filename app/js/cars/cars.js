module.exports = function(app) {
  require('./controllers/cars_controller')(app);
  require('./directives/car_form_directive.js')(app);
};
