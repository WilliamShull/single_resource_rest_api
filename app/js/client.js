require('angular/angular');

var carApp = angular.module('carApp', []);
require('./cars/cars')(carApp);
